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


def response(user_input: str) -> dict:
    code_analysis_chain = LLMChain(llm=llm, prompt=code_analysis_template)
    # The reason invoke() takes a dict is so that if there were multiple input_variables in the chain, you can set
    # the input variable name (in this case 'code') as the key in a dict entry and then put the actual input
    # as the value
    return code_analysis_chain.invoke({'code': user_input})


if __name__ == "__main__":
    print(response('print("Hello World")'))