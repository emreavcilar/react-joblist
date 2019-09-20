import React, {Component} from 'react';
import { Route, Switch, withRouter ,Redirect} from "react-router-dom";
import { connect } from "react-redux";
import * as ROUTES from './constants/routePaths';
import ListPage from './pages/listPage';
import DetailPage from './pages/detailPage';

class RoutesComponent extends Component {
    render() {
        return (
            <section className="content-root">
                <Switch>

                    <Route exact path={ROUTES.HOME} component={
                        ()=>{
                            return(<Redirect to={ROUTES.JOB_LIST} />);
                        }
                    }/>

                    <Route exact path={ROUTES.JOB_LIST} component={ListPage} />
                    <Route path={ROUTES.JOB_DETAIL} component={DetailPage}/>

                </Switch>
            </section>
        );
    }
}

const mapToStateProps = (state, dispatch) => {
    return {
        dispatch: dispatch,
    };
};
export default withRouter(connect(mapToStateProps)(RoutesComponent));
