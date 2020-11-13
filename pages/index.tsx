import React from 'react'
import Head from 'next/head'
import App from 'src'

const MainPage: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Component boilerplate</title>
        <meta
          name="description"
          content="Component boilerplate for prisma-cms"
        />
      </Head>
      <App.Provider
        value={{
          content: 'Some content',
        }}
      >
        <App.Consumer>
          {(context) => {
            return <div {...props}>{context.content}</div>
          }}
        </App.Consumer>
      </App.Provider>
    </>
  )
}

export default MainPage
