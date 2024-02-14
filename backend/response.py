import dotenv
from langchain_openai import ChatOpenAI, OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.schema import HumanMessage, SystemMessage

# For this to work, you need to create a file called '.env' and input the following:
# OPENAI_API_KEY=YOUR_KEY_HERE

dotenv.load_dotenv()
llm = OpenAI()
chat = ChatOpenAI()

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

general_AIModel_template = PromptTemplate (
   input_variables=['explanation'],
   template = 'You are a coding assistant tool designed to help users with various coding tasks.'
              ' Please assist the user with their request {explanation} by providing relevant information,'
              ' generating code snippets, analyzing code, completing code segments, or offering advice.'
              ' Please be as specific and helpful as possible.'
)


def response(user_input: str) -> dict:
    code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template)
    # The reason invoke() takes a dict is so that if there were multiple input_variables in the chain, you can set
    # the input variable name (in this case 'code') as the key in a dict entry and then put the actual input
    # as the value
    return code_analysis_chain.invoke({'code': user_input})


def AIModel(user_input: str, AIModel: str) -> dict:
    code_analysis_chain = LLMChain(llm=llm, prompt=general_AIModel_template)

    if AIModel == 'openai':
        code_analysis_chain = LLMChain(llm=llm, prompt=general_AIModel_template)

    return code_analysis_chain.invoke({'explanation': user_input})  


def code_generation(user_input: str, AIModel: str) -> dict:
    code_generation_chain = LLMChain(llm=llm, prompt=code_generation_template)

    if AIModel == 'openai':
        code_generation_chain = LLMChain(llm=llm, prompt=code_generation_template)

    # Default - will eventually be changed to the appropriate AIModel, right now it's just ChatGPT
    if AIModel == '':
        code_generation_chain = LLMChain(llm=llm, prompt=code_generation_template)

    return code_generation_chain.invoke({'explanation': user_input})  


def code_analysis(user_input: str, AIModel: str) -> dict:
    code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template)

    if AIModel == 'openai':
        code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template)
    
    # Default - will eventually be changed to the appropriate AIModel, right now it's just ChatGPT
    if AIModel == '':
        code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template)

    return code_analysis_chain.invoke({'code': user_input})  


def code_completion(user_input: str, AIModel: str) -> dict:
    code_completion_chain = LLMChain(llm=llm, prompt=code_completion_template)

    if AIModel == 'openai':
        code_completion_chain = LLMChain(llm=llm, prompt=code_completion_template)
    
    # Default - will eventually be changed to the appropriate AIModel, right now it's just ChatGPT
    if AIModel == '':
        code_completion_chain = LLMChain(llm=llm, prompt=code_completion_template)
    
    return code_completion_chain.invoke({'code': user_input})


def code_translation(input_language: str, target_language: str, code: str, AIModel: str) -> dict:
    code_translation_chain = LLMChain(llm=llm, prompt=code_translation_template)

    if AIModel == 'openai':
        code_translation_chain = LLMChain(llm=llm, prompt=code_translation_template)
    
    # Default - will eventually be changed to the appropriate AIModel, right now it's just ChatGPT
    if AIModel == '':
        code_translation_chain = LLMChain(llm=llm, prompt=code_translation_template)
    
    return code_translation_chain.invoke({'input_language': input_language,
                                          'target_language': target_language,
                                          'code': code})


if __name__ == "__main__":
    print(response('for (int i = 0; i <= 9; i++) System.out.println(i);'))
