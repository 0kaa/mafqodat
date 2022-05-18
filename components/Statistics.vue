<template>
  <div class="statistics-list">
    <v-row>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
      >
        <Statistic :title="$t('totalItems')" :count="statistics.items">
          <template slot="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
              <g id="Group_23136" data-name="Group 23136" transform="translate(-908 -158)">
                <rect
                  id="Rectangle_4552"
                  data-name="Rectangle 4552"
                  width="34"
                  height="34"
                  rx="4"
                  transform="translate(908 158)"
                  fill="#ffe7cb"
                />
                <g id="_1" data-name="1" transform="translate(860.87 117)">
                  <path id="Path_17188" data-name="Path 17188" d="M94.778,68.844A.778.778,0,0,1,94,68.066V48.778a.778.778,0,1,1,1.555,0V68.066A.778.778,0,0,1,94.778,68.844Z" transform="translate(-37.803)" fill="#f6931e" />
                  <path id="Path_17189" data-name="Path 17189" d="M74.2,379.555H54.908a.778.778,0,1,1,0-1.555H74.2a.778.778,0,1,1,0,1.555Z" transform="translate(0 -312.89)" fill="#f6931e" />
                  <path id="Path_17190" data-name="Path 17190" d="M153.7,125.024a.778.778,0,0,1-.665-1.18l3.357-5.552a.778.778,0,0,1,1.356.044l2.111,4.02,5.982-8.749a.778.778,0,1,1,1.284.878l-6.714,9.813a.778.778,0,0,1-1.33-.078l-2.071-3.944-2.644,4.373a.778.778,0,0,1-.666.375Z" transform="translate(-93.674 -61.884)" fill="#f6931e" />
                </g>
              </g>
            </svg>
          </template>
        </Statistic>
      </v-col>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
      >
        <Statistic :title="$t('totalItemsDelivered')" :count="statistics.delivered_items">
          <template slot="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
              <g id="Group_23137" data-name="Group 23137" transform="translate(-908 -158)">
                <g id="Group_22922" data-name="Group 22922" transform="translate(0 7)">
                  <rect
                    id="Rectangle_4552"
                    data-name="Rectangle 4552"
                    width="34"
                    height="34"
                    rx="4"
                    transform="translate(908 151)"
                    fill="#b7fff3"
                  />
                </g>
                <g id="_3209922_bag_drawn_earning_finance_hand_icon" data-name="3209922_bag_drawn_earning_finance_hand_icon" transform="translate(908.101 157.321)">
                  <path
                    id="Path_17196"
                    data-name="Path 17196"
                    d="M27.88,26.464a1.977,1.977,0,0,0-2.356-.284c-.553.361-1.3.687-1.539,1.237-.846,1.919-2.157,1.933-3.815,1.527a9.546,9.546,0,0,0-2.6.1.765.765,0,0,1-.905-.536.992.992,0,0,0-.96-.684,13.448,13.448,0,0,0-2.279-.044,3.665,3.665,0,0,0-2.517,1.069c-.5.568-1.032,1.11-1.558,1.652-.761.78-.821.77-1.454-.15-.171-.252-.284-.606-.664-.529-.315.059-.286.36-.32.618s-.264.354-.416.512c-.429.439-.866.863-1.279,1.325a.951.951,0,0,0,0,1.421,3.47,3.47,0,0,0,.416.531c1.961,1.756,3.413,4.116,5.825,5.358a.918.918,0,0,0,1.262-.13c.444-.421.826-.917,1.25-1.364.89-.943.941-1.195.416-2.3.219-.166.466-.09.7-.088,1.793.011,3.589.01,5.381.064a3,3,0,0,0,2.605-1.114c.646-.777,1.461-1.393,2.111-2.165A15.833,15.833,0,0,0,28.134,28.6,1.755,1.755,0,0,0,27.88,26.464ZM12.049,38.549a2.269,2.269,0,0,1-1.557-.655c-1.558-1.314-2.8-2.979-4.285-4.371a.626.626,0,0,1-.047-.976c.341-.371.723-.7,1.085-1.045a.279.279,0,0,1,.43.008,6.234,6.234,0,0,1,1.3,1.156,11.14,11.14,0,0,0,3.263,2.947c.458.328.7,1,1.389.967.042,0,.13.178.133.278A4.755,4.755,0,0,1,12.049,38.549Zm15.276-10.3a15.348,15.348,0,0,1-2.768,3.6c-.636.745-1.424,1.348-2.051,2.1a2.411,2.411,0,0,1-2.167.907c-.867-.047-1.736-.011-2.6-.011v-.052c-.923,0-1.847,0-2.769,0-.19,0-.38,0-.571.012-.584.027-1.121.529-1.762,0-1.049-.856-2.278-1.478-2.968-2.77-.088-.167-.174-.338-.033-.465,1.065-.939,1.733-2.389,3.239-2.765a10.444,10.444,0,0,1,2.594-.08.537.537,0,0,1,.532.449,1.061,1.061,0,0,0,1.22.769c.948-.029,1.9-.092,2.845-.119a.988.988,0,0,1,.966.325c.159.226.381.411.314.755-.075.383-.37.368-.626.433a8.148,8.148,0,0,1-4.252.376,1.823,1.823,0,0,1-.9-.354c-.2-.19-.43-.321-.636-.061a.617.617,0,0,0,.119.849,1.533,1.533,0,0,0,.811.372,7.482,7.482,0,0,0,4.027-.019,4.591,4.591,0,0,1,1.028-.26c.992-.037,1.33-.685,1.341-1.589.006-.444.165-.621.534-.7a1.859,1.859,0,0,0,1.4-1.293,3.7,3.7,0,0,1,2.023-1.779.982.982,0,0,1,1.12.326C27.653,27.541,27.474,27.908,27.326,28.245Z"
                    transform="translate(0 -9.649)"
                    fill="#12776c"
                    fill-rule="evenodd"
                  />
                  <path
                    id="Path_17197"
                    data-name="Path 17197"
                    d="M20.575,17.357c.446-.031.4-.473.386-.813a6.219,6.219,0,0,1,.111-1.634c.56-2.444,1.612-4.467,4-5.394.518-.2.634-.548.25-1.066a10.692,10.692,0,0,1-.811-1.4c-.369-.7-.167-1.188.562-1.41a1.763,1.763,0,0,1,.963.051,6.537,6.537,0,0,0,2.247.343c.349-.035.464.064.3.426-.425.962-.566,2.24-2.032,2.032a.463.463,0,0,0-.232.071c-.293.135-.706.224-.579.681.133.474.516.309.822.2a1.222,1.222,0,0,1,1.53.389,12.433,12.433,0,0,0,1.08,1.05,5.537,5.537,0,0,1,2.065,4.489c-.019.284.081.539.386.556s.4-.261.443-.52a4.713,4.713,0,0,0-.25-2.208A9.4,9.4,0,0,0,29,9.453a.81.81,0,0,1-.267-.957,25.137,25.137,0,0,1,1.077-2.614.875.875,0,0,0-.015-.906.615.615,0,0,0-.827-.091,2.944,2.944,0,0,1-2.075.081A4.653,4.653,0,0,0,25.053,4.7,1.757,1.757,0,0,0,23.725,7.47c.131.253.252.514.405.751.259.4.208.629-.225.862-2.655,1.432-3.431,4.059-3.853,6.694.023.421.021.625.05.824C20.147,16.932,20.116,17.391,20.575,17.357Z"
                    transform="translate(-6.886 0)"
                    fill="#12776c"
                    fill-rule="evenodd"
                  />
                  <path
                    id="Path_17198"
                    data-name="Path 17198"
                    d="M30.6,22.522a.7.7,0,0,1-.9-.374c-.146-.292-.307-.625-.669-.377-.31.213-.207.57-.076.861a4.683,4.683,0,0,0,1.357,1.4c.4.371.368-.552.719-.679a1.557,1.557,0,0,0,.3-.14,1.961,1.961,0,0,0-.007-3.287c-.4-.246-.823-.445-1.24-.653-.491-.243-.458-.617-.177-.978.442-.568.839-.346,1.192.146.157.217.35.379.627.254.174-.079.211-.246.18-.495a1.6,1.6,0,0,0-.1-.263c-.344-.642-1.035-.966-1.3-1.727-.111-.322-.627-.145-.592.255.049.543-.255.741-.542,1.041a1.565,1.565,0,0,0,.425,2.653c.366.189.734.374,1.092.58a.848.848,0,0,1,.429.941A.946.946,0,0,1,30.6,22.522Z"
                    transform="translate(-10.869 -5.167)"
                    fill="#12776c"
                    fill-rule="evenodd"
                  />
                  <path
                    id="Path_17199"
                    data-name="Path 17199"
                    d="M10.04,38.566c-.308.041-.447.2-.408.475.079.514.295.935.83,1.035.253.047.484-.1.414-.372A1.733,1.733,0,0,0,10.04,38.566Z"
                    transform="translate(-2.148 -15.4)"
                    fill="#12776c"
                    fill-rule="evenodd"
                  />
                </g>
              </g>
            </svg>
          </template>
        </Statistic>
      </v-col>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
      >
        <Statistic :title="$t('totalStation')" :count="statistics.stations">
          <template slot="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
              <g id="Group_23138" data-name="Group 23138" transform="translate(-908 -158)">
                <g id="Group_22922" data-name="Group 22922" transform="translate(0 7)">
                  <rect
                    id="Rectangle_4552"
                    data-name="Rectangle 4552"
                    width="34"
                    height="34"
                    rx="4"
                    transform="translate(908 151)"
                    fill="#ffd4b7"
                  />
                </g>
                <g id="Layer_13" data-name="Layer 13" transform="translate(912 162)">
                  <rect
                    id="Rectangle_4553"
                    data-name="Rectangle 4553"
                    width="22.779"
                    height="1.381"
                    transform="translate(2 23.398)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <rect
                    id="Rectangle_4554"
                    data-name="Rectangle 4554"
                    width="8.283"
                    height="1.381"
                    transform="translate(6.142 22.018)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <path
                    id="Path_17191"
                    data-name="Path 17191"
                    d="M14,36.712V27.53A1.53,1.53,0,0,1,15.53,26h3.826a1.53,1.53,0,0,1,1.53,1.53v9.182"
                    transform="translate(-7.409 -14.818)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <rect
                    id="Rectangle_4555"
                    data-name="Rectangle 4555"
                    width="3.451"
                    height="2.761"
                    transform="translate(8.212 13.044)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <rect
                    id="Rectangle_4556"
                    data-name="Rectangle 4556"
                    width="3.451"
                    height="1.381"
                    transform="translate(8.212 17.186)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <line
                    id="Line_391"
                    data-name="Line 391"
                    x2="1.381"
                    transform="translate(9.593 14.425)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <path
                    id="Path_17192"
                    data-name="Path 17192"
                    d="M32,37.652h.765a.765.765,0,0,0,.765-.765V31.53L32,30"
                    transform="translate(-18.522 -17.288)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <line
                    id="Line_392"
                    data-name="Line 392"
                    x1="1.381"
                    transform="translate(13.734 15.805)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <rect
                    id="Rectangle_4557"
                    data-name="Rectangle 4557"
                    width="8.283"
                    height="1.381"
                    transform="translate(15.805 22.018)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <path
                    id="Path_17193"
                    data-name="Path 17193"
                    d="M40,36.712V27.53A1.53,1.53,0,0,1,41.53,26h3.826a1.53,1.53,0,0,1,1.53,1.53v9.182"
                    transform="translate(-23.462 -14.818)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <rect
                    id="Rectangle_4558"
                    data-name="Rectangle 4558"
                    width="4.142"
                    height="2.761"
                    transform="translate(17.876 13.044)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <rect
                    id="Rectangle_4559"
                    data-name="Rectangle 4559"
                    width="4.142"
                    height="1.381"
                    transform="translate(17.876 17.186)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <line
                    id="Line_393"
                    data-name="Line 393"
                    x2="1.381"
                    transform="translate(19.257 14.425)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <path
                    id="Path_17194"
                    data-name="Path 17194"
                    d="M58,37.652h.765a.765.765,0,0,0,.765-.765V31.53L58,30"
                    transform="translate(-34.575 -17.288)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <line
                    id="Line_394"
                    data-name="Line 394"
                    x1="1.381"
                    transform="translate(23.398 15.805)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <rect
                    id="Rectangle_4560"
                    data-name="Rectangle 4560"
                    width="22.779"
                    height="2.761"
                    transform="translate(2 4.761)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <path
                    id="Path_17195"
                    data-name="Path 17195"
                    d="M22,5.061V2h7.652V5.061"
                    transform="translate(-12.348)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <line
                    id="Line_395"
                    data-name="Line 395"
                    y2="15.876"
                    transform="translate(2.69 7.522)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <line
                    id="Line_396"
                    data-name="Line 396"
                    x2="5.522"
                    transform="translate(10.973 3.381)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                  <line
                    id="Line_397"
                    data-name="Line 397"
                    y2="15.876"
                    transform="translate(4.071 7.522)"
                    fill="none"
                    stroke="#986324"
                    stroke-linejoin="round"
                    stroke-width="0.5"
                  />
                </g>
              </g>
            </svg>
          </template>
        </Statistic>
      </v-col>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
      >
        <Statistic :title="$t('totalEmployees')" :count="statistics.employees">
          <template slot="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
              <g id="Group_23139" data-name="Group 23139" transform="translate(-908 -158)">
                <g id="Group_22922" data-name="Group 22922" transform="translate(0 7)">
                  <rect
                    id="Rectangle_4552"
                    data-name="Rectangle 4552"
                    width="34"
                    height="34"
                    rx="4"
                    transform="translate(908 151)"
                    fill="rgba(151,165,26,0.44)"
                  />
                </g>
                <g id="_2318458_crew_team_group_people_users_icon" data-name="2318458_crew_team_group_people_users_icon" transform="translate(864.8 6.968)">
                  <g id="Group_22988" data-name="Group 22988" transform="translate(46.167 163.5)">
                    <path id="Path_17223" data-name="Path 17223" d="M62.695,209.19a3.895,3.895,0,1,1,3.895-3.895A3.9,3.9,0,0,1,62.695,209.19Zm0-5.835a1.947,1.947,0,1,0,1.947,1.947A1.95,1.95,0,0,0,62.695,203.354Z" transform="translate(-58.8 -201.4)" fill="#5a9540" />
                  </g>
                  <g id="Group_22989" data-name="Group 22989" transform="translate(52.982 168.375)">
                    <path id="Path_17224" data-name="Path 17224" d="M168.318,276.809H166.37a4.861,4.861,0,0,0-9.723,0H154.7a6.809,6.809,0,1,1,13.618,0Z" transform="translate(-154.7 -270)" fill="#5a9540" />
                  </g>
                  <g id="Group_22990" data-name="Group 22990" transform="translate(65.626 163.5)">
                    <path id="Path_17225" data-name="Path 17225" d="M336.495,209.19a3.895,3.895,0,1,1,3.895-3.895A3.9,3.9,0,0,1,336.495,209.19Zm0-5.835a1.947,1.947,0,1,0,1.947,1.947A1.95,1.95,0,0,0,336.495,203.354Z" transform="translate(-332.6 -201.4)" fill="#5a9540" />
                  </g>
                  <g id="Group_22991" data-name="Group 22991" transform="translate(54.93 160.6)">
                    <path id="Path_17226" data-name="Path 17226" d="M186.961,170.323a4.861,4.861,0,1,1,4.861-4.861A4.868,4.868,0,0,1,186.961,170.323Zm0-7.782a2.921,2.921,0,1,0,2.921,2.921A2.926,2.926,0,0,0,186.961,162.54Z" transform="translate(-182.1 -160.6)" fill="#5a9540" />
                  </g>
                  <g id="Group_22992" data-name="Group 22992" transform="translate(64.653 169.349)">
                    <path id="Path_17227" data-name="Path 17227" d="M320.847,289.535H318.9v-.974a4.861,4.861,0,1,1,9.723,0h-1.947a2.921,2.921,0,1,0-5.842,0v.974Z" transform="translate(-318.9 -283.7)" fill="#5a9540" />
                  </g>
                  <g id="Group_22993" data-name="Group 22993" transform="translate(45.2 169.349)">
                    <path id="Path_17228" data-name="Path 17228" d="M54.93,289.535H52.982v-.974a2.921,2.921,0,1,0-5.842,0H45.2a4.861,4.861,0,1,1,9.723,0v.974Z" transform="translate(-45.2 -283.7)" fill="#5a9540" />
                  </g>
                </g>
              </g>
            </svg>
          </template>
        </Statistic>
      </v-col>
      <v-col>
        <div class="statistics-item">
          <div class="statistics-item__content">
            <div class="statistics-station-content">
              <h3 class="statistics-item__title mb-3">
                {{ $t('totalStation') }}
              </h3>
              <div class="statistics-station-content-item">
                <span class="spin metro" />
                <h5>
                  {{ $t('metroStations') }}
                </h5>
              </div>
              <div class="statistics-station-content-item">
                <span class="spin bus" />
                <h5>
                  {{ $t('busStations') }}
                </h5>
              </div>
            </div>
            <div>
              <!-- progress circle -->
              <div class="progress-circle">
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-progress-circular
                      v-bind="attrs"
                      :value="80"
                      :size="54"
                      :rotate="280"
                      class="first-progress"
                      color="#505050"
                      v-on="on"
                    >
                      {{ statistics.stations }}
                    </v-progress-circular>
                  </template>
                  <span>{{ $t('busStations') + ' ' + statistics.bus_stations }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-progress-circular
                      v-bind="attrs"
                      :value="80"
                      :size="74"
                      :rotate="280"
                      color="primary"
                      v-on="on"
                    />
                  </template>
                  <span>{{ $t('metroStations') + ' ' + statistics.metro_stations }}</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  props: {
    statistics: {
      type: Object,
      required: true
    }
  }
}
</script>
