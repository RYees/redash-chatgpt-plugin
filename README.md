## Introduction

The Redash ChatGPT Plugin is an integration that brings natural language conversation capabilities powered by ChatGPT to your Redash dashboard. With this plugin, Redash users can engage in interactive and conversational queries, as well as visualize data directly from the chat interface.

## Features

* Conversational Queries: Users can interact with Redash using natural language queries, making the process more intuitive and user-friendly.
* Interactive Responses: ChatGPT generates human-like responses, providing users with informative and contextual feedback on their queries.
* Data Visualization: The plugin allows users to visualize query results directly within the chat interface, enabling faster data exploration and analysis.

`The Redash ChatGPT Plugin is an exciting project that aims to integrate natural language conversation capabilities powered by ChatGPT into your Redash dashboard. Although the plugin is still a work in progress, it currently provides functionality for engaging in conversational queries with ChatGPT directly within the Redash interface`

## Requirements Before Installation

Need to install redash instance to your local machine first, follow the below guide to install it

* https://github.com/getredash/redash/wiki/Local-development-setup
* For more reference: Redash - https://redash.io/

After successful redash instance installation, open the redash source code on your editor and follow the below steps to use the plugin inside your redash dashboard 

## Dependencies

``` 
  poetry add openai
```

``` 
  yarn add react-icons
```

``` 
  yarn add react-syntax-highlighter
```

## Installation

1. Copy the `chat` folder entirely `client/app/components/chat` to the corresponding place in redash's `client/app/components` folder
2. Copy the `chat.py` file entirely `redash/handlers/chat.py` to the corresponding place in redash's `redash/handlers` folder
   
Now we finished putting the necessary files for the plugin user interface and flask python code that includes the integration with openai, we now move to how we integrate these two parts inside the redash source code following the below procedure, implement them as stated below

* Go to your redash source code, locate these path `client/app/components/ApplicationArea/ApplicationLayout/index.jsx`

* copy and paste the following inside the index.jsx
  
```
    import ChatBox from "@/components/chat/ChatBox";
```

* The below code is mostly similar with the existing index.jsx return method the only new thing added is the ChatBox component as shown below so only add that or you can just copy and replace it entirely.

```
   return (
       <React.Fragment>
         <DynamicComponent name="ApplicationWrapper">
           <div className="application-layout-side-menu">
             <DynamicComponent name="ApplicationDesktopNavbar">
               <DesktopNavbar />
             </DynamicComponent>
           </div>
           <div>
             <DynamicComponent name="ApplicationDesktopChat">
               <ChatBox/>
             </DynamicComponent>
           </div>
           <div className="application-layout-content">
             <nav className="application-layout-top-menu" ref={mobileNavbarContainerRef}>
               <DynamicComponent name="ApplicationMobileNavbar" getPopupContainer={getMobileNavbarPopupContainer}>
                 <MobileNavbar getPopupContainer={getMobileNavbarPopupContainer} />
               </DynamicComponent>
             </nav>
             {children}
           </div>
         </DynamicComponent>
       </React.Fragment>
     );
```

* Go to your redash source code, locate these path `client/app/services`, create a file name chat.js and copy the below code

```
   import { axios } from "@/services/axios";
   
   const Chat = {
     openai: data => axios.post('api/chat', data),
   };
   
   export default Chat;
```

* Go to your redash source code, locate these path `redash/handlers/api.py`, inside the api.py file copy and add the following line of codes

```
   from redash.handlers.chat import (
       ChatResource
   )
```

find `api = ApiExt()`, these line of code inside the api.py and after it copy and add the below

```
   api.add_org_resource(ChatResource, "/api/chat", endpoint="chat")
```

* *final step* Inside your .env file add your openai api key, with the name indicated below

**Get your free openai key** - https://platform.openai.com/

``` 
  OPENAI_API_KEY=*****************************************
```



😉 **NICE WORK!!!
    Now rebuild your instance and get ready to engage in insightful conversations with AI directly within your Redash dashboard**
