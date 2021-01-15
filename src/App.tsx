import React, { useState, useEffect } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonSearchbar,
  IonSelect,
  IonLabel,
  IonSelectOption,
} from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import axios from 'axios'
import { Launch } from './interfaces/Launch.interface'
import Launches from './components/Launches'

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const [launches, setLaunches] = useState<Launch[]>([])
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([])
  const [groupBySuccess, setGroupBySuccess] = useState<boolean>()

  useEffect(() => {
    async function fetchData() {
      let res = await axios.post(
        'https://api.spacexdata.com/v4/launches/query',
        {
          options: {
            page,
            limit: 32,
          },
        }
      )
      setLaunches((launches) => launches.concat(res.data.docs))
    }
    fetchData()
  }, [page])

  useEffect(() => {
    let filteredLaunches = launches.filter(
      (launch: Launch) => launch.success === groupBySuccess
    )

    if (searchText !== '')
      filteredLaunches = filteredLaunches.filter(
        (launch: Launch) =>
          launch.name.toUpperCase().indexOf(searchText.toUpperCase()) > -1
      )

    setFilteredLaunches(filteredLaunches)
  }, [launches, groupBySuccess, searchText])

  async function searchNext(event: CustomEvent<void>) {
    setPage((page) => page + 1)
    ;(event.target as HTMLIonInfiniteScrollElement).complete()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SpaceX Launches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>SpaceX Launches</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonSearchbar
            value={searchText}
            placeholder='Enter Launch Name...'
            onIonChange={(e) => setSearchText(e.detail.value!)}
          ></IonSearchbar>
        </IonItem>
        <IonItem>
          <IonLabel>Launch Status</IonLabel>
          <IonSelect
            value={groupBySuccess}
            placeholder='Select One'
            onIonChange={(e) => setGroupBySuccess(e.detail.value)}
          >
            <IonSelectOption value=''>-</IonSelectOption>
            <IonSelectOption value={true}>Success</IonSelectOption>
            <IonSelectOption value={false}>Failed</IonSelectOption>
          </IonSelect>
        </IonItem>

        <Launches
          launches={filteredLaunches.length > 0 ? filteredLaunches : launches}
        />

        <IonInfiniteScroll
          threshold='100px'
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}
          disabled={page === 5}
        >
          <IonInfiniteScrollContent
            loadingSpinner='bubbles'
            loadingText={'Loading more data...'}
          />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  )
}

export default App
