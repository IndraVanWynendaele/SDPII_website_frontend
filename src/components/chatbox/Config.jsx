import { createChatBotMessage } from "react-chatbot-kit";
import Tools from "./widgets/Tools";
import ProductInfo from "./widgets/ProductInfo";
// import useSWR from "swr";
// import { getById, getAll } from "../../api/index";

const botName = "Aurora";

//config for chatbot
const config = {
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#bfbbbb",
    },
    chatButton: {
      backgroundColor: "#ec4842",
    },
  },
  initialMessages: [createChatBotMessage(`Hello, I am ${botName}.`)],
  state: {
    ProductInfoState: [
    ],
    AboutUsInfoState: [
    ],
    ToolsState: [
    ],
  },
  //widgets declaration section which we use in our bot for display information
  widgets: [
    {
      widgetName: "Tools",
      widgetFunc: (props) => <Tools {...props} />,
      mapStateToProps: ["ToolsState"],
    },
    {
      widgetName: "ProductInfo",
      widgetFunc: (props) => <ProductInfo {...props} />,
      mapStateToProps: ["ProductInfo"],
    },
    {
      widgetName: "AboutUsInfo",
      widgetFunc: (props) => <AboutUsInfo {...props} />,
      mapStateToProps: ["AboutUsInfo"],
    },
  ],
};

export default config;