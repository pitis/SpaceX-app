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
  IonInput,
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
    if (searchText !== '') {
      let filteredLaunches = launches.filter(
        (launch: Launch) =>
          launch.name.toUpperCase().indexOf(searchText.toUpperCase()) > -1
      )
      setFilteredLaunches(filteredLaunches)
    }
  }, [searchText, launches])

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
          <IonInput
            value={searchText}
            placeholder='Enter Launch Name...'
            onIonChange={(e) => setSearchText(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <Launches launches={searchText !== '' ? filteredLaunches : launches} />
        <IonInfiniteScroll
          threshold='100px'
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}
          disabled={page === 5}
        >
          <IonInfiniteScrollContent loadingText={'Loading more data...'} />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  )
}

export default App
