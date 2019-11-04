import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { Domain, search } from 'client/client'
import React, { useState } from 'react'
import './App.scss'

const App: React.FC = () => {
  const [domain, setDomain] = useState('')
  const [foundDomains, setFoundDomains] = useState([] as Domain[])

  const fetchDomains = (domain: string) => {
    search(domain).then(response => setFoundDomains(response.data.domains))
  }

  return (
    <div className="App">
      <div className="App-search-field">
        <TextField
          label={
            <div>
              <Search />
            </div>
          }
          fullWidth
          onKeyPress={e => {
            if (e.keyCode === 13 || e.key === 'Enter') {
              fetchDomains(domain)
            }
          }}
          onChange={e => setDomain(e.target.value)}
        />
      </div>
      <div className="App-break"></div>
      <div className="App-domain-list">
        {foundDomains.length !== 0 && (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Domain name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foundDomains.map(domain => (
                  <TableRow key={domain.name}>
                    <TableCell component="th" scope="row">
                      {domain.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </div>
    </div>
  )
}

export default App
