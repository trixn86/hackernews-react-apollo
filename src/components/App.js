import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import CreateLink from './CreateLink';
import Header from './Header';
import LinkList from './LinkList';
import Login from './Login';


class App extends Component {
    render() {
        //  return <LinkList />;
        // return <CreateLink />;
        return (
            <div className="center w85">
                <Header />
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/create" component={CreateLink} />
                        <Route exact path="/" component={LinkList} />
                    </Switch>
                </div>
            </div>
        );
    }
}


export default App;
