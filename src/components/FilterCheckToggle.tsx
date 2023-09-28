import { Eatery } from "../types/restaurant.types"
import { useState } from "react"
import RestaurantSidebar from "./RestaurantSidebar"

interface IData {
    data: Eatery[] | null
}

const filterCheckToggle:React.FC<IData> = ( {data} ) => {
    const [savedResults, setSavedResults] = useState<Eatery[]>([])
    const [lunch, setLunch] = useState<Eatery[]>([])
    const [dinner, setDinner] = useState<Eatery[]>([])
    const [afterwork, setAfterWork] = useState<Eatery[]>([])
    const [vegan, setVegan] = useState<Eatery[]>([])
    const [vegetarian, setVegetarian] = useState<Eatery[]>([])

    if(data === null ){
        return
    }

    const offerings = data.map((eatery) => {
        if(eatery.offering.lunch === "lunch"){
            const newValues = (prevValues:Eatery[]) => [...prevValues, eatery]
            setLunch(newValues)
            console.log("Yay! lunch!", lunch)
        }
        if(eatery.offering.afterWork === "after work"){
            const newValues = (prevValues:Eatery[]) => [...prevValues, eatery]
            setAfterWork(newValues)
            console.log("Yay! AfterWork!",newValues)
        }
        if(eatery.offering.dinner === "dinner"){
            const newValues = (prevValues:Eatery[]) => [...prevValues, eatery]
            setDinner(newValues)
            console.log("Yay! dinner!",newValues)
        }
        if(eatery.offering.vegan === "vegan"){
            const newValues = (prevValues:Eatery[]) => [...prevValues, eatery]
            setVegan(newValues)
            console.log("Yay! Vegan!",newValues)
        }
        if(eatery.offering.vegan === "vegetarian"){
            const newValues = (prevValues:Eatery[]) => [...prevValues, eatery]
            setVegetarian(newValues)
            console.log("Yay! Vegetarian!",newValues)
        }
        console.log("offerings", offerings)
        console.log("lunch", lunch)
        console.log("dinner", dinner)
        console.log("aw", afterwork)
        console.log("vegan", vegan)
        console.log("vegetarian", vegetarian)

    })
    return(
        <RestaurantSidebar
            data={data}
        />
    )        
}
export default filterCheckToggle