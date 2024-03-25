# from datetime import datetime
# from langchain_openai import OpenAIEmbeddings
# from langchain_openai import OpenAI
# from langchain.memory import VectorStoreRetrieverMemory
# from langchain.chains import ConversationChain
# from langchain.prompts import PromptTemplate
# import faiss
# from langchain.docstore import InMemoryDocstore
# from langchain_community.vectorstores import FAISS
# embedding_size = 1536 # Dimensions of the OpenAIEmbeddings
# index = faiss.IndexFlatL2(embedding_size)
# embedding_fn = OpenAIEmbeddings().embed_query
# vectorstore = FAISS(embedding_fn, index, InMemoryDocstore({}), {})
# # In actual usage, you would set `k` to be a higher value, but we use k=1 to show that
# # the vector lookup still returns the semantically relevant information
# retriever = vectorstore.as_retriever(search_kwargs=dict(k=1))
# memory = VectorStoreRetrieverMemory(retriever=retriever)
# # When added to an agent, the memory object can save pertinent information from conversations or used tools
# memory.save_context({"input": "My favorite food is pizza"}, {"output": "that's good to know"})
# memory.save_context({"input": "My favorite sport is soccer"}, {"output": "..."})
# memory.save_context({"input": "I don't the Celtics"}, {"output": "ok"}) #
# print(memory.load_memory_variables({"prompt": "what sport should i watch?"})["history"])




from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.memory import VectorStoreRetrieverMemory
from langchain.chains import ConversationChain
from langchain.prompts import PromptTemplate
# from langchain_community.vectorstores import Milvus
# from langchain_openai import OpenAIEmbeddings
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
connections.connect(host="127.0.0.1", port=default_server.listen_port)
utility.drop_collection('LangchainConnection')
vectordb = Milvus.from_documents(
    {},
    embeddings,
    connection_args={"host":"127.0.0.1", "port":default_server.listen_port}
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
    memory.save_context({"input": i["input"]}, {"output": i["output"]})
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
conversation_chain.predict(input="hi my name is ben")
# conversation_chain.predict(input="what is my favourite food")