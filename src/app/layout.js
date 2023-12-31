import './globals.css'
import ReduxProvider from './store/provider'
export const metadata = {
  title: 'Работа в Казахстане, поиск персонала и публикация вакансий - hh.kz',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
