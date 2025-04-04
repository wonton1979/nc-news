import pic400 from '../../assets/images/400.svg'
import pic404 from '../../assets/images/404.svg'
import noContent from '../../assets/images/non-content.svg'


export default function Error({error}){
    if(error === 404){
        return (
            <div className="picture-wrapper">
                <div className="picture-frame flex justify-center">
                    <img src={pic404} alt="404 error,page not found" className="lg:w-1/2 md:w-2/3" />
                </div>
            </div>
        )
    }
    if(error === 0){
        return (
            <div className="picture-wrapper">
                <div className="picture-wrapper">
                    <div className="picture-frame flex justify-center">
                        <img src={noContent} alt="non content has been found" className="lg:w-1/3 md:w-2/3" />
                    </div>
                </div>
            </div>
        )
    }
    if(error === 400){
        return (
            <div className="picture-wrapper">
                <div className="picture-frame flex justify-center">
                    <img src={pic400} alt="400 Bad Request" className="lg:w-1/3 md:w-2/3" />
                </div>
            </div>
        )
    }

}