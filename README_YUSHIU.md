# Comments & feedbacks from Yu Shiu

- Scraping NPS takes a while. It seems a tradeoff between how much we spend the time and how completely we crawl the content. At first, I planed to target at only the links with park abbreviations, such as zion for Zion National Park and there are 472 of them. I need to crawl 472 times with different setups and then combine the dictionary outputs. I settled crawling 100,000 pages under the main url www.nps.org with .htm extensions. It saves me from working a script between Python and Javascript.  

- The output from gpt-crawler is a list of dictionary. Each dictionary consists of three keys: html, url and title. {"title": XXX, "url": YYY, "html": ZZZ}. The value of html consists of texts without html tags. However, it has many short texts for the clickable areas on the webpage, which are not long enough to be informative. I use the newline \n to find them out and only include lines of texts longer than or equal to 10 words. The cleaned json file were named *_clean.json. 

- The input to the vector store is a single paragraph of text. Therefore, the all three sets of keys and values are combined.  

- Generation of image understanding is done through OpenAI's Vision API calls. Through OpenAI Vision API, given a URL to the image, a short description on the content is returned. For each web page, I find the image links and then call the API for each of them. 

- Understanding images is accomplished upon the output JSON files from gpt-crawler. A key "images" and its value, which inclues all the images, is inserted {"images": {"IMG1_URL": IMAGE1_DESCRIPTION, "IMG2_URL": IMAGE2_DESCRIPTION, ... }}. 

- The Vision API takes from 5 to 15 seconds for each image and we have 100,000 webpages to find the image URLs. I use several criteria to sample the webpages. First, I targeted only the webpages associated directly with the park abbreviations. Second, I only checked the images in jpg or jpeg, but not bmp or png. Third, I sample only 2,500 out of 100,000 webpages, considering the long time it takes. It takes almost 2.5 hours and thus roughly one hour for each 1,000 webpages. 
Certainly I can do better than the measly 3% but settled with the small number to show what a MVP is. 

- Indexing in RAG on Macbook M1 is slow for a website of around 100,000 webpages. Langchain's implementation seems redundant and slows the indexing down. I played with using Chromadb directly but more problems incur. For example, it has stricter rules regarding unicode and I haven't figured out how to use it as the retriever in the RAG. 

- Langchain offers asynchronous FAISS for faster indexing. With V100 on Google Colab, it takes less than 20 minutes to accomplish the indexing, whereas it takes more than three hours on Mac M1 and can't finish the job. 

- I did not tackle the hallucination task but I have some thoughts how to fight it. First, in the prompt we can ask LLM to have multi-step reasoning or chain of thoughts. We can offer the examples in the prompts (In-context learning). Second, we can also ask LLM to offer numbers specifically, such as the length of trails, as supporting evidences to make a claim.  

## Files

### RAG QnA for National Park Service

- rag_v1.ipynb: the notebook
- output_all_parks_clean.json: knowledgable base
- vectordb_indexing.ipynb: vector indexing using Colab's GPU
- faiss_index_all_parks: indexed FAISS for text

### RAG QnA with images for National Park Service

- rag_v2.ipynb
- output_all_parks_clean_img.json: knowledgable base with image understanding
- data_image.ipynb: Calling OpenAI Vision APIs and include text descriptions for images
- vectordb_indexing_img.ipynb: vector indexing using Colab's GPU
- faiss_index_all_parks_image: indexed FAISS for text and images

### Others
- park_list.txt: a list showing the abbreviations and names of national parks and monuments.
- READM_YUSHIU.md: feedback, comments and file list
- config.ts: the config file used for gpt-crawler
