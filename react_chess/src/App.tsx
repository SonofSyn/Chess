
import React from 'react';
import './css/App.css';
import Page from './Page';



interface Props {

}

interface State {

}

export class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = App.createState(props)
    }
    static createState(props: Props): State {
        return {}
    }
    render(): JSX.Element {
        return (
          <Page></Page>
        )
    }


}

export default App;
