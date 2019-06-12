import Head from 'next/head'
import { PureComponent } from 'react'
import AutosizeInput from 'react-input-autosize'

class Index extends PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      value: '',
      status: '',
      link: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setStatus = (code) => {
    var status = ''
    if (code === 404) status = 'User could not be found.'
    else status = 'Something went wrong. Please try again.'
    this.setState({ status: status })
  }

  getLink = async (username) => {
    fetch(`/api/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.error !== undefined) this.setStatus(data.error.status)
        else window.location.href = data.link
      })
      .catch(error => {
        this.setStatus(error.statusCode)
      })
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.setState({ status: 'Hang on, redirecting...' })
    await this.getLink(this.state.value)
  }

  render() {
    const { value } = this.state

    const settings = {
      type: 'text',
      value: this.state.value,
      onChange: this.handleChange,
      placeholder: 'Enter Username and Press Enter',
      autoComplete: 'off',
      autoCorrect: 'off',
      spellCheck: false,
      style: { width: '100%' }
    }

    return (
      <main>
        <Head>
          <title>InstaProf - View full size Instagram profile pics</title>
          <link rel='icon' type='image/png' href='/static/favicon.png' />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <meta name="google-site-verification" content="-OUQErdFfpMCR3jPeSTsmuvA87QCFwTYRgUluvSWa5Q" />
          <link rel='stylesheet' href='/static/index.css' />
          <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />
        </Head>

        <section>
          <h1>InstaProf</h1>

          <p>Enter an Instagram account username to view its profile picture
          in <i>full size</i>.</p>

          <form onSubmit={this.handleSubmit}>
            <AutosizeInput {...settings} />
          </form>

          <p>{this.state.status}</p>
        </section>

        <aside>
          <nav>
            <a href="https://github.com/k4m4/instaprof-site" target="_blank">Source</a>
            <b/>
            <a href="https://github.com/CodeDotJS/instagram-profile-picture" target="_blank">Module</a>
            <b/>
            <a href="https://zeit.co/now" target="_blank">Hosted on Now</a>
          </nav>
        </aside>
      </main>
    )
  }
}

export default Index
