import { Route, BrowserRouter } from "react-router-dom";

import Download from './Download';
import Upload from "./Upload";

const Routes = () => {
    //Utilizando o react-router-dom para gerenciar as rotas da aplicação, aplicando os títulos.
    return ( 
        <BrowserRouter>
            <Route component={Upload} title="FastUp - Upload" path="/" exact />
            <Route component={Download} title="FastUp - Downlaod" path="/download" />
        </BrowserRouter>
    )
}

export default Routes;