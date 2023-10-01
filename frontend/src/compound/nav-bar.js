import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getadmin, removedata } from '../scrives/storage'
import { Accountpopup } from '../alert/account';
import { adminauth } from '../scrives/auth';

export function Head(prop) {
    const navigator = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [account, Setaccount] = useState(false);
    const [filter, Setfilter] = useState(false);
    const [menu, Setmenu] = useState(false)
    const logouthandler = () => {
        removedata();
        navigator('/register')
    }

    useEffect(() => {
        if (location.pathname === `/video/${id}`) {
            Setfilter(true)
        } else {
            Setfilter(false)
        }
    }, [location.pathname])
    const accounthandler = () => {
        Setaccount(true)
    }
    if (account) {
        return <Accountpopup close={accounthandler} />
    }

    const menuhandler = () => {
        Setmenu(!menu)
    }
    return (
        <Fragment>
            <div className="myhome" >
                <div className="nav-bar" id="navbar">
                    <Link to={'/home'}><div className="logo"><img src="/material/logonav.png" alt="" /></div></Link>
                    <div className="nav">
                        <ul className={menu ? "open-menu" : ""}>
                            <li onClick={menuhandler}>Menu<i class="fa-solid fa-xmark"></i></li>
                            <li onClick={logouthandler}>Register</li>
                            <li>About-us</li>
                            {adminauth() ?
                                <Link to={'/admin'}><li>Add</li></Link> : null
                            }
                            <li onClick={accounthandler}><i className="fa fa-user-circle"></i>Account</li>
                        </ul>
                        {filter ?
                            <div className='filter' onClick={prop.filter}>
                                <i class="fa-solid fa-arrow-down-short-wide"></i>
                            </div> : null
                        }
                        <div className='menu' onClick={menuhandler}>
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
}