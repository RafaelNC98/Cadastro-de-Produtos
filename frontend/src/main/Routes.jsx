import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import ProdutoCRUD from '../components/produtos/ProdutoCRUD'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/produtos' component={ProdutoCRUD} />
        <Redirect from='*' to='/' />
    </Switch>