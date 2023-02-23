import { useRef } from "react"




//this is just the short hand for races which will be populated with the same race objects coming from the backend
export default function SummarizedRace(props){





    //we use a turnary to lead WIN or LOSS based on wether the user won or not and from that we can apply the correct
    //statement

    return(

        <div
        className="map-page__data-card__race-summary__most-recent-races__race-box"
        onClick={()=> props.setRace(props.race)}
        style={props.style}
        >
            <div className="map-page__data-card__race-summary__most-recent-races__race-box__user">

                    <img
                    className="map-page__data-card__race-summary__most-recent-races__race-box__user__pfp"
                    src={props.user}
                    />

                    
                        <h3 className="map-page__data-card__race-summary__most-recent-races__race-box__user__status">
                            {props.race.status ? "WIN " : "LOSS"}
                        </h3>
                    

            </div>

                            <h3 className="map-page__data-card__race-summary__most-recent-races__race-box__vs">
                                VS
                            </h3>


            <div className="map-page__data-card__race-summary__most-recent-races__race-box__racer">



                    <h3 className="map-page__data-card__race-summary__most-recent-races__race-box__racer__status">
                                {!props.race.status ? "WIN " : "LOSS"}
                    </h3>
                
                    <img
                    className="map-page__data-card__race-summary__most-recent-races__race-box__racer__pfp"
                    src={props.race.racer.racerPfp}
                    />

                

            </div>
        </div>
    )

}