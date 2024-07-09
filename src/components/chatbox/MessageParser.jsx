class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message) => {
    //convert message in lowercase wich passed by user
    const lowerCase = message.toLowerCase();

    //define your keyword in condition and return handler function whixh created in actionprovider
    if (
      lowerCase.includes("hi") ||
      lowerCase.includes("hii") ||
      lowerCase.includes("hiii") ||
      lowerCase.includes("hello") ||
      lowerCase.includes("hey") ||
      lowerCase.includes("hiiii") ||
      lowerCase.includes("..") ||
      lowerCase.includes("heyy")
    ) {
      return this.actionProvider.Greeting();
    }

    if (
      lowerCase.includes("feature") ||
      lowerCase.includes("what you provide") ||
      lowerCase.includes("provide") ||
      lowerCase.includes("services") ||
      lowerCase.includes("tools") ||
      lowerCase.includes("tool") ||
      lowerCase.includes("about") ||
      lowerCase.includes("help") ||
      lowerCase.includes("methods")
    ) {
      return this.actionProvider.Tools();
    }

    if (
      lowerCase.includes("products") ||
      lowerCase.includes("amount") ||
      lowerCase.includes("product")
    ) {
      return this.actionProvider.ProductInfoHandle();
    }

    if (
      lowerCase.includes("delaware") ||
      lowerCase.includes("platform") ||
      lowerCase.includes("business") ||
      lowerCase.includes("b2b")
    ) {
      return this.actionProvider.AboutUsInfoHandle();
    }

    return this.actionProvider.handleDefault();
  };
}

export default MessageParser;