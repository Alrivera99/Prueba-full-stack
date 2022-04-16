// Layout

import LayoutAdmin from '../layouts/LayoutAdmin'

//Admin Pages

import AdminHome from '../pages/Admin' 
import AdminSignIn from '../pages/Admin/SignIn'
import AdminUsers from '../pages/Admin/Users'
import AdminBook from '../pages/Admin/Book'


//Other
import Error404 from '../pages/Error404'


const routes =[
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact:true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact:true
            },
            {
                path: "/admin/books",
                component:AdminBook,
                exact: true
            },
            {
                component:Error404
            }

        ]
    },
    {
        path: "/" ,
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                component:Error404
            }
        ]
    }
];

export default routes;