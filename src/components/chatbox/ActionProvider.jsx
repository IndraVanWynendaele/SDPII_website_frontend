class ActionProvider {

  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // const {
  //   data: questions = [],
  //   isQuestionsLoading,
  //   errorQuestions,
  // } = useSWR('chatbox', getAll);

  // const { data: quest, isQuestionLoading, errorQuestion } = useSWR('chatbox/1', getById);

  //method for add message in our chatbot
  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };

  //simple greeting which return simple message
  Greeting = () => {
    const message = this.createChatBotMessage(`Hello!`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
  };

  //use tools widget, return button and action doing
  Tools = () => {
    const message = this.createChatBotMessage(
      `We provide these features:`,
      {
        withAvatar: true,
        widget: "Tools",
      }
    );
    this.addMessageToBotState(message);
  };

  //for weather widget, API testing and fetch data return current weather info of city using API
  ProductInfoHandle = async () => {
    const message = this.createChatBotMessage(`Amount of products on our portal: 20`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
  };

  AboutUsInfoHandle = async () => {
    const message = this.createChatBotMessage(`Developed by Delaware, our platform simplifies B2B interactions. Streamline procurement, foster collaboration, and drive growth with our intuitive tools. Join us and transform your business interactions today!`, {
      withAvatar: true,
    });
    this.addMessageToBotState(message);
  }

  //default handler if you not found any mathes
  handleDefault = () => {
    const message = this.createChatBotMessage("How can I help?", {
      withAvatar: true,
      widget: "Tools",
    });
    this.addMessageToBotState(message);
  };
}

export default ActionProvider;