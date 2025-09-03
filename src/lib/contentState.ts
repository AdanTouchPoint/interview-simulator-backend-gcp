// contentState.ts
export interface TextStyle {
    text: string;
  }
  
  export interface ViewContent {
    title: TextStyle;
    instructions?: TextStyle;
    description?: TextStyle;
    tac?: TextStyle;
    button?: string;
  }
  export interface inputOptions{
    name?: string;
    postalCode?: string;
    city?: string;
    phone?: string;
    email?: string;
    state?:string;
  }
  export interface styleProps {
    backgroundColor: string; 
    textColor: string;
    labelColor: string;
    inputBackground: string;
    linkColor: string;
    inputTextColor: string;
    buttonColor: string;
    buttonTextColor: string;
    buttonBColor: string;
    buttonBTextColor: string;
    formWidth: string; 
  }
  export interface typ {
    tymessage: TextStyle;
    tymessage2: TextStyle;
    shareText: TextStyle;
    shareMessage: TextStyle;
    shareUrl : TextStyle;
  }

  export  interface ProjectData {
    title: string;
    description: string;
    campaignType: string;
    id: string;
    leads: number;
    homepage: string;
    startDate: string;
    endDate: string;
    repo: string;
    status: string;
    projectId: string;
    emailCount: number;
  }
  
  export interface ContentState {
    mainform: ViewContent;
    style: styleProps;
    projectData: ProjectData;
    emailform?: ViewContent;
    emailreview?: ViewContent
    privacy?: ViewContent;
    questions?: ViewContent;
    email?: ViewContent;
    ty: typ;
  }
  export const initialContentStateSB = {
    clientId:'',
    projectData: {
      title:'',
      description:'',
      campaignType: '',
      id:'',
      leads: 0,
      homepage: '',
      startDate: '',
      endDate: '',
      repo: '',
      status: '',
      projectId: '',
      emailCount: 0,
    },
    style:{
      backgroundColor: '#2c3e50',
      textColor: '#34495e',
      labelColor: '#34495e',
      inputBackground: '#34495e',
      linkColor: '#34495e',
      inputTextColor: '#34495e',
      buttonColor: '#34495e',
      buttonTextColor: '#34495e',
      buttonBColor: '#34495e',
      buttonBTextColor: '#34495e',
      formWidth: '400px'
    },
    mainform: {
      title: {
        text: 'Título principal',

      },
      mainFormInputs:[{
        text: 'name',

      }],
      instructions: {
        text: 'Instrucciones principales'
      },
      tac: {
        text: 'Términos y condiciones'
      },
      button: '#ff0000', // Color del botón
    },
    privacy: {
      title: {
        text: 'Título de privacidad'
      },
      privacyOptions: {
        public: {
          text: 'Título de privacidad' 
        },
        confidential: {
          text: 'Título de privacidad'
        },
        nameWithHeld: {
          text: 'Título de privacidad'
        }
      }
    },
    questions: {
      title: {
        text: 'Título de preguntas'
      },
      instructions: {
        text: 'Instrucciones de preguntas'
      },
      questions:[{
        text: 'question1',

      }]
    },
    email: {
      title: {
        text: 'Título de email'
      },
      instructions: {
        text: 'Instrucciones de email'
      }
    },
    ty: {
      tymessage: {
        text: 'Título de agradecimiento'
      },
      tymessage2: {
        text: 'Descripción de agradecimiento'
      },
      shareText: {
        text: 'Instrucciones de agradecimiento'
      },
      shareMessage: {
        text: 'Instrucciones de agradecimiento'
      },
      shareUrl: {
        text: 'Instrucciones de agradecimiento'
      },
    },
  };