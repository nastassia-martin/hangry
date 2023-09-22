import React from 'react'
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
import { Transition } from 'react-transition-group'
import { useState } from 'react'

interface SidebarProps {
    DATA: Eateries
    HIDDEN: boolean
}

const Sidebar:React.FC<SidebarProps> = ({
    HIDDEN
}) => {
    const [isOpen, toggleIsOpen] = useState(false)
    const { data:datadata } = useGetEateries() 
    {/*remove when implemented in navbar?*/}

    return (
        <>
            <Transition in={isOpen} timeout={250}>
                <SidebarMenu 
                    bg='dark'
                    variant='dark' 
                    style={{height:'100%', 
                            width:'20%', 
                            zIndex:'2', 
                            position:'sticky', 
                            top:'0px', 
                            overflow:'scroll', 
                            margin:'0px'}} 
                    exclusiveExpand={true}
                    hide={HIDDEN}> {/* for toggling sidebar*/}
                    <SidebarMenuHeader style={{display:'block'}}>
                        <SidebarMenuBrand>
                            🍋Places to eat!
                        </SidebarMenuBrand>
                    </SidebarMenuHeader>
                        <SidebarMenuBody>
                            <SidebarMenuNav>
                                {datadata?.map((place:Eatery) => ( 
                                    <SidebarMenu.Sub key={place._id}>
                                        <SidebarMenuSub.Toggle label={place.address.restaurantName}>
                                            <SidebarMenuNavIcon/>
                                                {place.address.restaurantName}
                                        </SidebarMenuSub.Toggle>
                                        <SidebarMenuSub.Collapse>
                                            <SidebarMenuNav>
                                                {place.address && (
                                                    <SidebarMenuNavItem>
                                                    <SidebarMenuNavItem>
                                                        <SidebarMenu.Text>
                                                            <div style={{
                                                                        height:'100px', 
                                                                        margin:'5px', 
                                                                        padding:'5px'
                                                                    }}>
                                                                <p style={{textTransform: 'capitalize'}}>
                                                                    {place.address.street} {place.address.addressNumber}<br/>
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
                                                            </p>
                                                            <p>
                                                                📧{place.restaurangDetails.email}
                                                            </p>
                                                            <SidebarMenuNavLink href={place.restaurangDetails.Facebook}>
                                                                🤹Facebook
                                                            </SidebarMenuNavLink>
                                                            <SidebarMenuNavLink href={place.restaurangDetails.Instagram}>
                                                                🦄Instagram
                                                            </SidebarMenuNavLink>
                                                            <SidebarMenuNavLink href={place.restaurangDetails.website}>
                                                                Click here for virus 🦠
                                                            </SidebarMenuNavLink>
                                                        </div>
                                                    </SidebarMenuNavItem>
                                                )}
                                            </SidebarMenuNav>
                                        </SidebarMenuSub.Collapse>
                                    </SidebarMenu.Sub>  
                                ))}
                            </SidebarMenuNav>
                            <SidebarMenuFooter>
                                <SidebarMenu.Text>
                                    Copyright LLMN Inc.
                                </SidebarMenu.Text>
                            </SidebarMenuFooter>
                        </SidebarMenuBody>
                </SidebarMenu>
            </Transition>
        </>
  )
}

export default Sidebar