import React from 'react'
import "./DashboardTop.scss"

const DashboardTop = () => {
  return (
    <div class="flexbox">
        <div class="item item-1">
            <div class="Content content-1"></div>
            <div class="Name">Nuch-cha Boonyato</div>
        </div>
        <div class="item item-2">
           <div class="Data">
              <div class="Dataweight">Weight</div>
              <div class="Dataheight">Height</div>
              <div class="Dataage">Age</div>
            </div>
            <div class="Content content-2">
             <div class="weight">0 cm</div>
             <div class="Height">0 Kg</div>
             <div class="Age">0</div>
            </div>
        </div>
    </div>

  )
}

export default DashboardTop