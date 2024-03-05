import os
import dotenv
import json
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import HuggingFaceHub
from langchain.schema import HumanMessage, SystemMessage
# Import ChromaDB related modules
import chromadb
from chromadb.config import Settings

# For this to work, you need to create a file called '.env' and input the following:
# OPENAI_API_KEY=YOUR_KEY_HERE
dotenv.load_dotenv()
# Create ChromaDB client and collection
chromadb_client = chromadb.PersistentClient(path="/path/to/persist/directory")#
# Check if the collection exists
# Check if the collection exists
try:
    # Try to create the collection
    response_collection = chromadb_client.create_collection(name="CodeResponses")
except chromadb.db.base.UniqueConstraintError:
    # The collection already exists, get the existing collection
    response_collection = chromadb_client.get_collection(name="CodeResponses")

# You need to put the hugging face token in .env as well
os.environ['HUGGINGFACEHUB_API_TOKEN'] = os.getenv('HUGGINGFACE_TOKEN')

# AI Models
gpt = ChatOpenAI()
starcoder = HuggingFaceHub(
    repo_id='bigcode/starcoder'
)
llama = HuggingFaceHub(
    repo_id='codellama/CodeLlama-7b-hf'
)
def log_response(user_input, result):
    # Get the current count of responses
    user_input_str = json.dumps(user_input)
    result_str = json.dumps(result)
    response_count = response_collection.count()

    # Define a dictionary to store information about the response
    response_info = {
        "user_input": user_input_str,
        "response": result_str,
    }

    # Add the response to ChromaDB
    response_collection.add(
        documents=[response_info],
        metadatas=[{"source": "code response"}],
        ids=[f"response_{response_count + 1}"]
    )
# Templates
code_analysis_template = PromptTemplate(
    input_variables=['input'],
    template='You are a code analysis tool. Please evaluate my code and check for any possible mistakes. Please tell me what my code does and give  \
        give feedback and tips on how to improve it. Please be specific as possible: My code is here as follows: {input}'
)

code_generation_template = PromptTemplate(
   input_variables=['input'],
   template= 'You are a code generation tool. Please generate code based on the explanation being given {input}.'
             ' Please ensure that the generated code is correct, follows best practices, and meets the given criteria.'
             ' Be as specific as possible'
)

code_completion_template = PromptTemplate(
    input_variables=['input_language', 'input'],
    template='You are a code completion tool. The input will be incompleted code in {input_language}. \
            Your job is to correct the code so that it is working and complete. Add in semicolons, \
            parenthesis, curly braces, etc. where needed. Please ensure that the code is correct \
            and follows best practices or standards set in programming language mentioned above. \
            The output should only be a completed version of the inputted code. My code is given \
            as follows: {input}'
)

code_translation_template = PromptTemplate(
    input_variables=['input_language', 'output_language', 'input'],
    template='You are a code translation tool. Please translate my code from {input_language} to {output_language}.'
             ' Please ensure that the generated code is correct with attention to semicolons, curly braces and'
             ' indentation where needed. My code is given as follows: {input}'
)

general_ai_model_template = PromptTemplate (
   input_variables=['input'],
   template = 'You are a coding assistant tool designed to help users with various coding tasks.'
              ' Please assist the user with their request {input} by providing relevant information,'
              ' generating code snippets, analyzing code, completing code segments, or offering advice.'
              ' Please be as specific and helpful as possible.'
)

# AI Model Functions
def AIModel(user_input: str, ai_model: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama
    
    code_analysis_chain = LLMChain(llm=llm, prompt=general_ai_model_template)
    # Log the code response to ChromaDB
    result = code_analysis_chain.invoke({'input': user_input})
    log_response(user_input, result)
    return code_analysis_chain.invoke({'input': user_input})  


def code_generation(user_input: str, ai_model: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama
    
    code_generation_chain = LLMChain(llm=llm, prompt=code_generation_template)

    return code_generation_chain.invoke({'input': user_input})  


def code_analysis(user_input: str, ai_model: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama
    
    code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template)

    return code_analysis_chain.invoke({'input': user_input})


def code_completion(user_input: str, ai_model: str, input_language: str) -> dict:
    # llama by default
    llm = llama

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'openai':
            llm = gpt
    
    code_completion_chain = LLMChain(llm=llm, prompt=code_completion_template)
    
    return code_completion_chain.invoke({'input_language': input_language, 'input': user_input})


def code_translation(input_language: str, output_language: str, input: str, ai_model: str) -> dict:
    # starcoder by default
    llm = starcoder

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'llama':
            llm = llama
        elif ai_model == 'openai':
            llm = gpt
    
    code_translation_chain = LLMChain(llm=llm, prompt=code_translation_template)
    #output = code_translation_chain.invoke({'input_language': input_language, 'output_language': output_language, 'code': code})
    
    return code_translation_chain.invoke({'input_language': input_language, 'output_language': output_language, 'input': input})


if __name__ == "__main__":
    # Enter code here to debug
    '''
    res = code_translation(input_language='c', target_language='java', ai_model='gpt', code=)
    for line in res['code'].split(r'\n'):
        print(line)
    print('response is: ')
    for line in res['text'].split(r'\n'):
        print(line)
    '''
    pass
