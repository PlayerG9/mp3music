import { ReactElement } from 'react'
import { Route } from 'react-router-dom'


const ROUTES: ReactElement[] = []


export function buildRoutes(){
	return <Route path='/'>
		{ROUTES}
	</Route>
}


export function registerRoute(newRoute: any){
	ROUTES.push(newRoute)
}
