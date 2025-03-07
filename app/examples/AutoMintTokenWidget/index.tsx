
    import { steps } from './AutoMintTokenWidgetSnippet';
    import { codeString } from './AutoMintTokenWidgetString';
    import { AutoMintTokenWidget as example, action } from './AutoMintTokenWidget';

    export const AutoMintTokenWidget = Object.assign(example, {
      steps,
      id: "AutoMintTokenWidget",
      String:codeString
      
      , action
    });
  