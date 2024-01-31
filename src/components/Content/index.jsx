import { useState } from 'react'
import styles from './Content.module.css'
import image from './images/heart.png'
import axios from 'axios'

const baseUrl = 'https://love-calculator.p.rapidapi.com/getPercentage'
const key = process.env.REACT_APP_API_KEY

function Content () {
    const [name1, setName1] = useState('')
    const [name2, setName2] = useState('')
    const [couple, setCouple] = useState()
    const [error, setError] = useState('')
    const [marginTop, setMarginTop] = useState(0)
    const [highlight, sethighlight] = useState({})

    async function consumeData (e) {
        e.preventDefault()
        setError('')

        if (!name1 || !name2) {
            setError('Please enter both names.')
            return
        }

        try {
            const response = await axios.get(baseUrl, {
                headers: {
                    'X-RapidAPI-Key': key,
                    'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
                },
                params: {
                    sname: name1,
                    fname: name2,
                },
            })

            const data = response.data
            const dataFormated = {
                names: `${data.sname} and ${data.fname}`,
                percentage: `${data.percentage}%`,
                result: data.result,
            }
            setCouple(JSON.stringify(dataFormated))
            setMarginTop(20)
            sethighlight({fontSize: '24px'})
        } catch (error) {
            setError(error)
        }
    }

    return (
        <>
            <div className={styles.content}>
                <img src={image} alt='Couple' />
                <form onSubmit={consumeData}>
                    <input
                        type='text'
                        placeholder='Name 1'
                        value={name1}
                        required='required'
                        onChange={e => setName1(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Name 2'
                        value={name2}
                        required='required'
                        onChange={e => setName2(e.target.value)}
                    />
                    <div>
                        <button type='submit'>
                            Click to Test
                        </button>
                    </div>
                </form>

                <div style={{ marginTop: `${marginTop}px`}}>
                    <p style={highlight}>{error !== '' ? error : couple && JSON.parse(couple).names}</p>
                    <p>{error !== '' ? '' : couple && JSON.parse(couple).percentage}</p>
                    <p>{error !== '' ? '' : couple && JSON.parse(couple).result}</p>
                </div>
            </div>
        </>
    )
}

export default Content
