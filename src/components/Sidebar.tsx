import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import SidebarMenu, { SidebarMenuHeader, 
                      SidebarMenuBrand,
                      SidebarMenuCollapse, 
                      SidebarMenuNav, 
                      SidebarMenuBody, 
                      SidebarMenuFooter, 
                      SidebarMenuNavIcon, 
                      SidebarMenuContext, 
                      SidebarMenuNavItem, 
                      SidebarMenuSub, 
                      SidebarMenuSubContext, 
                      SidebarMenuNavLink, 
                      SidebarMenuNavTitle } from 'react-bootstrap-sidebar-menu'
import { Eatery, Eateries } from '../types/restaurant.types'
import useGetEateries from '../hooks/useGetEateries'


const Sidebar = () => {
    const { data } = useGetEateries()
    return (
        <>
            <SidebarMenu bg='dark' style={{width: '20%'}} variant='dark' className='d-flex flex-column' exclusiveExpand={true}>
                <SidebarMenuHeader style={{display:'block'}}>
                    <SidebarMenuBrand>
                        🍋Places to eat!
                    </SidebarMenuBrand>
                </SidebarMenuHeader>
                <SidebarMenuBody>
                    <SidebarMenuNav style={{width: '100%'}}>
                        {data?.map((place:Eatery) => ( 
                            <SidebarMenuSub key={place._id}>
                                <SidebarMenuSub.Toggle label={place.address.restaurantName}>
                                    <SidebarMenuNavIcon>
                                    </SidebarMenuNavIcon>
                                    <SidebarMenuNavTitle>
                                        <p style={{textTransform: 'capitalize'}}>
                                            {place.address.restaurantName}
                                        </p>
                                    </SidebarMenuNavTitle>
                                </SidebarMenuSub.Toggle>
                                <SidebarMenuSub.Collapse>
                                    <SidebarMenuNav>
                                        {place.address && (
                                            <SidebarMenuNavItem>
                                        <SidebarMenuNavIcon>
                                            🏨
                                        </SidebarMenuNavIcon>
                                        <SidebarMenuNavTitle>
                                        </SidebarMenuNavTitle>
                                            <SidebarMenuNavItem>
                                                <SidebarMenu.Text>
                                                    <div>
                                                        <p>
                                                            {place.address.street} {place.address.addressNumber}
                                                        <p>
                                                        </p>
                                                            {place.address.city} {place.address.postcode}
                                                        </p>
                                                    </div>
                                                </SidebarMenu.Text>
                                            </SidebarMenuNavItem>
                                        </SidebarMenuNavItem>)}
                                        {place.restaurangDetails && (
                                            <SidebarMenuNavItem>
                                                <div>
                                                    <p>
                                                        📞{place.restaurangDetails.telephone}
                                                    <p>
                                                    </p>
                                                        📧{place.restaurangDetails.email}
                                                    <p>
                                                    </p>
                                                    <SidebarMenuNavLink href={place.restaurangDetails.Facebook}>
                                                    🤹Facebook
                                                </SidebarMenuNavLink>
                                                    <p>
                                                    </p>
                                                <SidebarMenuNavLink href={place.restaurangDetails.Instagram}>
                                                    🦄Instagram
                                                </SidebarMenuNavLink>
                                                    <p>
                                                    </p>
                                                <SidebarMenuNavLink href={place.restaurangDetails.website}>
                                                    Click here for virus 🦠
                                                </SidebarMenuNavLink>
                                                    </p>
                                                </div>
                                            </SidebarMenuNavItem>
                                        )}
                                    </SidebarMenuNav>
                                </SidebarMenuSub.Collapse>
                            </SidebarMenuSub>  
                        ))}
                    </SidebarMenuNav>
                </SidebarMenuBody>
                <SidebarMenuFooter>
                    <SidebarMenu.Text>
                        Copyright LLMN Inc.
                    </SidebarMenu.Text>
                </SidebarMenuFooter>
            </SidebarMenu>
        </>
  )
}

export default Sidebar