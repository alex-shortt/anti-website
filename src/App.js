import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import useReactRouter from "use-react-router"

import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import GA from "services/ga"
import { ShopifyProvider } from "services/shopify"

const View = React.lazy(() => import("scenes/View"))
const Product = React.lazy(() => import("scenes/Product"))
const Privacy = React.lazy(() => import("scenes/Privacy"))
const Tax = React.lazy(() => import("scenes/Tax"))
const Terms = React.lazy(() => import("scenes/Terms"))

const GoogleAnalytics = () => {
  const { location } = useReactRouter()
  useEffect(() => GA.pageview(location.pathname), [location])
  return <> </>
}

export default function App() {
  printCredits()

  return (
    <ShopifyProvider>
      <GlobalStyles />
      <React.Suspense fallback={<FullScreenLoading />}>
        <Router>
          <GoogleAnalytics />
          <Switch>
            <Route path="/" exact component={View} />
            <Route path="/privacy" exact component={Privacy} />
            <Route path="/tax" exact component={Tax} />
            <Route path="/terms" exact component={Terms} />
            <Route path="/:handle" component={Product} />
            {/* TODO: 404 Page */}
          </Switch>
        </Router>
      </React.Suspense>
    </ShopifyProvider>
  )
}

function printCredits() {
  const credits = `
   ______     __   __     ______   __
  /\\  __ \\   /\\ "-.\\ \\   /\\__  _\\ /\\ \\
  \\ \\  __ \\  \\ \\ \\-.  \\  \\/_/\\ \\/ \\ \\ \\
   \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\    \\ \\_\\  \\ \\_\\
    \\/_/\\/_/   \\/_/ \\/_/     \\/_/   \\/_/


  Alex Shortt
      https://instagram.com/alexander.shortt
      https://twitter.com/_alexshortt
  `
  console.log(credits)
}
