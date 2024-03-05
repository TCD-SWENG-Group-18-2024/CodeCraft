import dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import HuggingFaceHub
from langchain.schema import HumanMessage, SystemMessage

dotenv.load_dotenv()

gpt = ChatOpenAI()

template = PromptTemplate(input_variables=['language', 'input'],
                          template='You are a code completion tool. The input will be incompleted code in {language}. Your job is to correct the code so that it is working \
and complete. Add in semicolons, parenthesis, curly braces, etc. where needed. Please ensure that the code is correct and \
follows best practices or standards set in programming language mentioned above. The output should only be a completed version of the inputted code. My code is \
given as follows: {input}')

code = """

print('Hello World

"""



chain = LLMChain(llm=gpt, prompt=template)

output = chain.invoke({'input': code, 'language': 'Java'})

print(output)
print(output['text'])