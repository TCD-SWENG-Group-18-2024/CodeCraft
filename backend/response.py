import os
import dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import HuggingFaceHub
from langchain.schema import HumanMessage, SystemMessage
import openai
from milvus import default_server
from pymilvus import utility, connections
from langchain.vectorstores import Milvus
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.memory import VectorStoreRetrieverMemory


# For this to work, you need to create a file called '.env' and input the following:
# OPENAI_API_KEY=YOUR_KEY_HERE
dotenv.load_dotenv()

# You need to put the hugging face token in .env as well
os.environ['HUGGINGFACEHUB_API_TOKEN'] = os.getenv('HUGGINGFACE_TOKEN')

default_server.start()
embeddings = OpenAIEmbeddings()
connections.connect(host="127.0.0.1", port=default_server.listen_port)
utility.drop_collection('LangChainCollection')
vectordb = Milvus.from_documents(
    {},
    embeddings,
    connection_args={"host":"127.0.0.1", "port":default_server.listen_port}
)
retriever = Milvus.as_retriever(vectordb, search_kwargs=dict(k=1))
memory = VectorStoreRetrieverMemory(retriever=retriever)

# AI Models
gpt = ChatOpenAI()
starcoder = HuggingFaceHub(
    repo_id='bigcode/starcoder'
)
llama = HuggingFaceHub(
    repo_id='codellama/CodeLlama-7b-hf'
)

# Templates
code_analysis_template = PromptTemplate(
    input_variables=['history', 'input'],
    template='You are a code analysis tool. Please evaluate my code and check for any possible mistakes.'
             ' Please tell me what my code does and give feedback and tips on how to improve it.'
             ' You will help me identify potential bugs in this code, give important suggestions'
             ' on improving the code quality and maintainability, and check if it adheres to coding'
             ' standards and best practices.'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_generation_template = PromptTemplate(
    input_variables=['history', 'input'],
    template='You are a code generation tool. Please generate code based on the explanation being given.'
             ' Please ensure that the generated code is correct, follows best practices, and meets the given criteria.'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_completion_template = PromptTemplate(
    input_variables=['input_language', 'history','input'],
    template='You are a code completion tool. The input will be incompleted code in {input_language}.'
             ' Your job is to correct the code so that it is working and complete. Add in semicolons,'
             ' parenthesis, curly braces, etc. where needed. Please ensure that the code is correct'
             ' and follows best practices or standards set in programming language mentioned above.'
             ' The output should only be a completed version of the inputted code.'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_translation_template = PromptTemplate(
    input_variables=['input_language', 'output_language', 'history', 'input'],
    template='You are a code translation tool. Please translate my code from {input_language} to {output_language}.'
             ' Please ensure that the generated code is correct with attention to semicolons, curly braces and'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

general_ai_model_template = PromptTemplate(
    input_variables=['history', 'input'],
    template='You are a coding assistant tool designed to help users with various coding tasks.'
             ' Please assist the user with their request by providing relevant information,'
             ' generating code snippets, analyzing code, completing code segments, or offering advice.'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
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

    # If the collection had been deleted, it needs to be re-initialised
    if 'LangChainCollection' not in utility.list_collections():
        initialise_vectordb()
    
    # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
    code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template, memory=memory, verbose=True)
    response = code_analysis_chain.invoke({'input': user_input})

    # Save the prompt/response pair in the Milvus collection
    memory.save_context({'input': user_input}, {'output': response['text']})

    return response 


def code_generation(user_input: str, ai_model: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama
    
    # If the collection had been deleted, it needs to be re-initialised
    if 'LangChainCollection' not in utility.list_collections():
        initialise_vectordb()

    # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
    code_generation_chain = LLMChain(llm=llm, prompt=code_generation_template, memory=memory, verbose=True)
    response = code_generation_chain.invoke({'input': user_input})

    # Save the prompt/response pair in the Milvus collection
    memory.save_context({'input': user_input}, {'output': response['text']})

    return response


def code_analysis(user_input: str, ai_model: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama

    # If the collection had been deleted, it needs to be re-initialised
    if 'LangChainCollection' not in utility.list_collections():
        initialise_vectordb()

    # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
    code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template, memory=memory, verbose=True)
    response = code_analysis_chain.invoke({'input': user_input})

    # Save the prompt/response pair in the Milvus collection
    memory.save_context({'input': user_input}, {'output': response['text']})

    return response


def code_completion(user_input: str, ai_model: str, input_language: str) -> dict:
    # llama by default
    llm = llama

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'openai':
            llm = gpt
    
    # If the collection had been deleted, it needs to be re-initialised
    if 'LangChainCollection' not in utility.list_collections():
        initialise_vectordb()

    # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
    code_completion_chain = LLMChain(llm=llm, prompt=code_completion_template, memory=memory, verbose=True)
    response = code_completion_chain.invoke({'input_language': input_language, 'input': user_input})

    # Save the prompt/response pair in the Milvus collection
    memory.save_context({'input': user_input}, {'output': response['text']})
    
    return response


def code_translation(input_language: str, output_language: str, user_input: str, ai_model: str) -> dict:
    # starcoder by default
    llm = starcoder

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'llama':
            llm = llama
        elif ai_model == 'openai':
            llm = gpt
    
    # If the collection had been deleted, it needs to be re-initialised
    if 'LangChainCollection' not in utility.list_collections():
        initialise_vectordb()

    # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
    code_translation_chain = LLMChain(llm=llm, prompt=code_translation_template, memory=memory, verbose=True)
    response = code_translation_chain.invoke({'input_language': input_language, 'output_language': output_language, 'input': user_input})

    # Save the prompt/response pair in the Milvus collection
    memory.save_context({'input': user_input}, {'output': response['text']})
    
    return response


def initialise_vectordb():
    """
    Initialises an empty VectorDB.
    This function is inelegant but seemingly necessary because of Python's weirdness with variable scope
    """
    # Implicitly declare new collection
    vectordb = Milvus.from_documents(
        {},
        embeddings,
        connection_args={"host": "127.0.0.1", "port": default_server.listen_port}
    )

    retriever = Milvus.as_retriever(vectordb, search_kwargs=dict(k=1))
    global memory
    memory = VectorStoreRetrieverMemory(retriever=retriever)


if __name__ == "__main__":
    # Enter code here to debug
    pass
