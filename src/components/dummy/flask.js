import React from 'react';
import * as AI from '../../api/ai';
import { Button } from 'react-bootstrap';

export class FlaskTestButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'Test Model Environment',
        };
    }

    connectToEnv() {
        AI.testFlaskEnv().then((res) => {
            this.setState({ display: 'Connected Successfully!' });
        });
    }

    render() {
        const style = { margin: 50 };
        return (
            <Button variant="light" style={style} onClick={this.connectToEnv.bind(this)}>
                {this.state.display}
            </Button>
        );
    }
}
