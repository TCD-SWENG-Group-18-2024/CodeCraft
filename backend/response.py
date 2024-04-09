import os
import dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import HuggingFaceHub
from milvus import default_server
from pymilvus import utility, connections
from langchain.vectorstores import Milvus
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.memory import VectorStoreRetrieverMemory
import re

# For this to work, you need to create a file called '.env' and input the following:
# OPENAI_API_KEY=YOUR_KEY_HERE
# HUGGINGFACE_TOKEN=YOUR_KEY_HERE
dotenv.load_dotenv()
os.environ['HUGGINGFACEHUB_API_TOKEN'] = os.getenv('HUGGINGFACE_TOKEN')

embeddings = OpenAIEmbeddings()
milvus_uri = os.getenv('MILVUS_URI')
milvus_token = os.getenv('MILVUS_TOKEN')

connections.connect("default", uri=milvus_uri, token=milvus_token)

# AI Models
gpt = ChatOpenAI()
starcoder = HuggingFaceHub(
    repo_id='bigcode/starcoder'
)
llama = HuggingFaceHub(
    repo_id='codellama/CodeLlama-7b-hf'
)

# Templates
code_analysis_template_history = PromptTemplate(
    input_variables=['history', 'input'],
    template='You are a code analysis tool. Please evaluate my code and check for any possible mistakes.'
             ' Please tell me what my code does and give feedback and tips on how to improve it.'
             ' You will help me identify potential bugs in this code, give important suggestions'
             ' on improving the code quality and maintainability, and check if it adheres to coding'
             ' standards and best practices.'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_analysis_template = PromptTemplate(
    input_variables=['input'],
    template='You are a code analysis tool. Please evaluate my code and check for any possible mistakes.'
             ' Please tell me what my code does and give feedback and tips on how to improve it.'
             ' You will help me identify potential bugs in this code, give important suggestions'
             ' on improving the code quality and maintainability, and check if it adheres to coding'
             ' standards and best practices.'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_generation_template_history = PromptTemplate(
    input_variables=['history', 'input'],
    template='You are a code generation tool. Please generate code based on the explanation being given.'
             ' Please ensure that the generated code is correct, follows best practices, and meets the given criteria.'
             ' Please include unit tests for all code created. Please include doctests for Python.'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_generation_template = PromptTemplate(
    input_variables=['input'],
    template='You are a code generation tool. Please generate code based on the explanation being given.'
             ' Please ensure that the generated code is correct, follows best practices, and meets the given criteria.'
             ' Please include unit tests for all code created. Please include doctests for Python.'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_completion_template_history = PromptTemplate(
    input_variables=['history', 'input_language', 'input'],
    template='You are a code completion tool. The input will be incompleted code in {input_language}.'
             ' Your job is to correct the code so that it is working and complete. Add in semicolons,'
             ' parenthesis, curly braces, etc. where needed. Please ensure that the code is correct'
             ' and follows best practices or standards set in programming language mentioned above.'
             ' The output should only be a completed version of the inputted code.'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_completion_template = PromptTemplate(
    input_variables=['input_language', 'input'],
    template='You are a code completion tool. The input will be incompleted code in {input_language}.'
             ' Your job is to correct the code so that it is working and complete. Add in semicolons,'
             ' parenthesis, curly braces, etc. where needed. Please ensure that the code is correct'
             ' and follows best practices or standards set in programming language mentioned above.'
             ' The output should only be a completed version of the inputted code.'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_translation_template_history = PromptTemplate(
    input_variables=['history', 'input_language', 'output_language', 'input'],
    template='You are a code translation tool. Please translate my code from {input_language} to {output_language}.'
             ' Please ensure that the generated code is correct with attention to semicolons, curly braces and'
             ' Relevant pieces of previous information: {history}'
             ' Please be specific as possible. My code is here as follows: {input}'
)

code_translation_template = PromptTemplate(
    input_variables=['input_language', 'output_language', 'input'],
    template='You are a code translation tool. Please translate my code from {input_language} to {output_language}.'
             ' Please ensure that the generated code is correct with attention to semicolons, curly braces and'
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


def remove_special_characters(input_string):
    # Define a regular expression pattern to match "@" and "."
    pattern = r'[.@]'

    # Use the sub() function from the re module to replace matches of the pattern with an empty string
    result = re.sub(pattern, '', input_string)

    return result


# AI Model Functions
def AIModel(user_input: str, ai_model: str, email: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama

    try:
        collection_name = remove_special_characters(email)
        memory = initialise_vectordb(collection_name)

        # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
        code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template_history, memory=memory, verbose=True)
        response = code_analysis_chain.invoke({'input': user_input})

        # Save the prompt/response pair in the Milvus collection
        memory.save_context({'input': user_input}, {'output': response['text']})
    except:
        code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template, verbose=True)
        response = code_analysis_chain.invoke({'input': user_input})

    return response


def code_generation(user_input: str, ai_model: str, email: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama

    try:
        collection_name = remove_special_characters(email)
        memory = initialise_vectordb(collection_name)

        # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
        code_generation_chain = LLMChain(llm=llm, prompt=code_generation_template_history, memory=memory, verbose=True)
        response = code_generation_chain.invoke({'input': user_input})

        # Save the prompt/response pair in the Milvus collection
        memory.save_context({'input': user_input}, {'output': response['text']})
    except:
        code_generation_chain = LLMChain(llm=llm, prompt=code_generation_template, verbose=True)
        response = code_generation_chain.invoke({'input': user_input})

    return response


def code_analysis(user_input: str, ai_model: str, email: str) -> dict:
    # GPT by default
    llm = gpt

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'llama':
            llm = llama

    try:
        collection_name = remove_special_characters(email)
        memory = initialise_vectordb(collection_name)

        # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
        code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template_history, memory=memory, verbose=True)
        response = code_analysis_chain.invoke({'input': user_input})

        # Save the prompt/response pair in the Milvus collection
        memory.save_context({'input': user_input}, {'output': response['text']})
    except:
        code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template, verbose=True)
        response = code_analysis_chain.invoke({'input': user_input})

    return response


def code_completion(user_input: str, ai_model: str, input_language: str, email: str) -> dict:
    # llama by default
    llm = llama

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'starcoder':
            llm = starcoder
        elif ai_model == 'openai':
            llm = gpt

    try:
        collection_name = remove_special_characters(email)
        memory = initialise_vectordb(collection_name)

        # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
        code_completion_chain = LLMChain(llm=llm, prompt=code_completion_template_history, memory=memory, verbose=True)
        response = code_completion_chain.invoke({'input_language': input_language, 'input': user_input})

        # Save the prompt/response pair in the Milvus collection
        memory.save_context({'input': user_input}, {'output': response['text']})
    except:
        code_completion_chain = LLMChain(llm=llm, prompt=code_completion_template, verbose=True)
        response = code_completion_chain.invoke({'input_language': input_language, 'input': user_input})

    return response


def code_translation(input_language: str, output_language: str, user_input: str, ai_model: str, email: str) -> dict:
    # starcoder by default
    llm = starcoder

    if ai_model:
        ai_model = ai_model.lower()

        if ai_model == 'llama':
            llm = llama
        elif ai_model == 'openai':
            llm = gpt

    try:
        collection_name = remove_special_characters(email)
        memory = initialise_vectordb(collection_name)

        # Passing in memory to the LLMChain, so we don't need to pass the memory into invoke()
        code_translation_chain = LLMChain(llm=llm, prompt=code_translation_template_history, memory=memory,
                                          verbose=True)
        response = code_translation_chain.invoke(
            {'input_language': input_language, 'output_language': output_language, 'input': user_input})

        # Save the prompt/response pair in the Milvus collection
        memory.save_context({'input': user_input}, {'output': response['text']})
    except:
        code_translation_chain = LLMChain(llm=llm, prompt=code_translation_template, verbose=True)
        response = code_translation_chain.invoke(
            {'input_language': input_language, 'output_language': output_language, 'input': user_input})

    return response


def initialise_vectordb(email):
    vectordb = Milvus.from_documents(
        {},
        embeddings,
        connection_args={"uri": milvus_uri, "token": milvus_token},
        collection_name=email
    )

    retriever = Milvus.as_retriever(vectordb, search_kwargs=dict(k=1))

    return VectorStoreRetrieverMemory(retriever=retriever, input_key='input')


if __name__ == "__main__":
    # Enter code to debug
    pass
