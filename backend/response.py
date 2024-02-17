import dotenv
from langchain_openai import ChatOpenAI, OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import HuggingFaceHub
from langchain.schema import HumanMessage, SystemMessage
import os


# For this to work, you need to create a file called '.env' and input the following:
# OPENAI_API_KEY=YOUR_KEY_HERE
dotenv.load_dotenv()

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

code_analysis_template = PromptTemplate(
    input_variables=['code'],
    template='You are a code analysis tool. Please evaluate my code and check for any possible mistakes. Please tell me what my code does and give  \
        give feedback and tips on how to improve it. Please be specific as possible: My code is here as follows: {code}'
)

code_generation_template = PromptTemplate(
   input_variables=['explanation'],
   template= 'You are a code generation tool. Please generate code based on the explanation being given {explanation}.'
             ' Please ensure that the generated code is correct, follows best practices, and meets the given criteria.'
             ' Be as specific as possible'
)

code_completion_template = PromptTemplate(
    input_variables=['code'],
    template='You are a code completion tool. Please complete my code, this includes adding semicolons where needed.'
             ' Please ensure that the completed code is correct and follows best practices. My code is given as'
             ' follows: {code}'
)

code_translation_template = PromptTemplate(
    input_variables=['input_language', 'target_language', 'code'],
    template='You are a code translation tool. Please translate my code from {input_language} to {target_language}.'
             ' Please ensure that the generated code is correct with attention to semicolons, curly braces and'
             ' indentation where needed. My code is given as follows: {code}'
)

general_ai_model_template = PromptTemplate (
   input_variables=['explanation'],
   template = 'You are a coding assistant tool designed to help users with various coding tasks.'
              ' Please assist the user with their request {explanation} by providing relevant information,'
              ' generating code snippets, analyzing code, completing code segments, or offering advice.'
              ' Please be as specific and helpful as possible.'
)


def AIModel(user_input: str, ai_model: str) -> dict:
    # GPT by default
    code_analysis_chain = LLMChain(llm=gpt, prompt=general_ai_model_template)

    if ai_model.lower() == 'starcoder':
        code_analysis_chain = LLMChain(llm=starcoder, prompt=general_ai_model_template)
    elif ai_model.lower() == 'llama':
        code_analysis_chain = LLMChain(llm=llama, prompt=general_ai_model_template)

    return code_analysis_chain.invoke({'explanation': user_input})  


def code_generation(user_input: str, ai_model: str) -> dict:
    # GPT by default
    code_generation_chain = LLMChain(llm=gpt, prompt=code_generation_template)

    if ai_model.lower() == 'starcoder':
        code_generation_chain = LLMChain(llm=starcoder, prompt=code_generation_template)

    return code_generation_chain.invoke({'explanation': user_input})  


def code_analysis(user_input: str, ai_model: str) -> dict:
    # GPT by default
    code_analysis_chain = LLMChain(llm=gpt, prompt=code_analysis_template)

    if ai_model.lower() == 'starcoder':
        code_analysis_chain = LLMChain(llm=starcoder, prompt=code_analysis_template)

    return code_analysis_chain.invoke({'code': user_input})  


def code_completion(user_input: str, ai_model: str) -> dict:
    # GPT by default
    code_completion_chain = LLMChain(llm=gpt, prompt=code_completion_template)

    if ai_model.lower() == 'starcoder':
        code_completion_chain = LLMChain(llm=starcoder, prompt=code_completion_template)
    
    return code_completion_chain.invoke({'code': user_input})


def code_translation(input_language: str, target_language: str, code: str, ai_model: str) -> dict:
    # GPT by default
    code_translation_chain = LLMChain(llm=gpt, prompt=code_translation_template)

    if ai_model is not None and ai_model.lower() == 'starcoder':
        code_translation_chain = LLMChain(llm=starcoder, prompt=code_translation_template)
    
    return code_translation_chain.invoke({'input_language': input_language,
                                          'target_language': target_language,
                                          'code': code})


if __name__ == "__main__":
    # Enter code here to debug
    pass
