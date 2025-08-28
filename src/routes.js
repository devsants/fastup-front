import { Route, BrowserRouter } from "react-router-dom";

import Download from './Download';
import Upload from "./Upload";

const Routes = () => {
    return ( 
        <BrowserRouter>
            <Route component={Upload} title="FastUp - Upload" path="/" exact />
            <Route component={Download} title="FastUp - Downlaod" path="/download" />
        </BrowserRouter>
    )
}

export default Routes;