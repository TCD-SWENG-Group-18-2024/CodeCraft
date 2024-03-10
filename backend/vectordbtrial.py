from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.llms import OpenAI
from langchain.memory import VectorStoreRetrieverMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
import os 
from dotenv import load_dotenv
import openai
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
from milvus import default_server
default_server.start()
from langchain.vectorstores import Milvus
embeddings=OpenAIEmbeddings()
from pymilvus import utility, connections
connections.connect(host="127.0.0.1", port=default_server.listenport)
utility.dropconnection('LangchainConnection')
vectordb = Milvus.from_documents(
    {},
    embeddings,
    connection_args={"host":"127.0.0.1", "port":default_server.listenport}
)
retriever = Milvus.as_retriever(vectordb, search_kwargs=dict(k=1))
memory = VectorStoreRetrieverMemory(retriever=retriever)
about_me=[
    {"input": "my favourite singer is taylor swift",
     "output":"Nice"},
    {"input": "my favourite food is ice cream",
     "output":"cool"},
    {"input": "my bedtime is half 10",
     "output":"great"},
]
for i in about_me:
    memory.savecontext("input", i["input"], "output", i["output"])
print(memory.load_memory_variables({"prompt":"who is my favourite singer"}))
llm = OpenAI(temperature=0)
DEFAULT_TEMPLATE = """The following exchange is a friendly conversation with a human and ai.The ai is talkative and provides a lot of specific details from its context.
If the ai doesnt kniw the answer to the question, it will truthfully say it does not know.

Relevant pieces of previous information:
{history}

Current Conversation:
Humans: {input}
Ai:"""
PROMPT = PromptTemplate(
    input_variables=["input", "history"],template = DEFAULT_TEMPLATE
)
conversation_chain = ConversationChain(
    llm = llm,
    prompt = PROMPT,
    memory = memory,
    verbose = True
)
conversation_chain.predict(input = "hi my name is ben")
    