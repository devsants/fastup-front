import { Route, BrowserRouter } from "react-router-dom";

import Download from './Download';
import Upload from "./Upload";

const Routes = () => {
    return ( 
        <BrowserRouter>
            <Route component={Upload} path="/" exact />
            <Route component={Download} path="/download" />
        </BrowserRouter>
    )
}

export default Routes;