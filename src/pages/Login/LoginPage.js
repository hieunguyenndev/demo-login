import { useState } from 'react';
import * as getRequest from '../../api/BaseRequest';
const LoginPage = () => {
    const [user, setUser] = useState('')
    const [pwd, setPassword] = useState('')
    const [valueMouseS, setValueMouseS] = useState(false)
    const [valueMouseE, setValueMouseE] = useState(false)
    let [round, setRound] = useState(null)
    const [passwordShown, setPasswordShown] = useState(false);
    const [err, setErr] = useState('')
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [copy_sucess, setCopy] = useState(null)

    // icons
    const getImage = () => {
        return require(`../../assets/icons/dev-icon.png`)
    }
    const getIconUser = () => {
        return require(`../../assets/icons/user.png`)
    }
    const getArrowImg = () => {
        return require(`../../assets/icons/arrow.png`)
    }
    const getIconWarning = () => {
        return require(`../../assets/icons/warning.png`)
    }
    const getIconCopy = () => {
        return require(`../../assets/icons/clipart.png`)
    }
    // handle
    const handleEvent = (e) => {
        if (round) {
            if (e.type === "focus") {
                setValueMouseE(true)
            } else {
                setValueMouseE(false)
            }
        } else {
            if (e.type === "focus") {
                setValueMouseS(true)
            } else {
                setValueMouseS(false)
            }
        }
    }

    const nextRound = (e) => {
        e.preventDefault();
        if (!round) {
            if (user) {
                if (user !== 'eve.holt@reqres.in') {
                    setErr('Email hoặc tài khoản không tồn tại')
                } else {
                    setRound('next')
                    setErr('')
                }
            } else {
                setErr('Vui lòng nhập email hoặc tên đăng nhập')
            }
        } else {
            if (pwd) {
                if (pwd !== 'cityslicka') {
                    setErr('Mật khẩu sai')
                } else {
                    login()
                    setErr('')
                }
            } else {
                setErr('Mật khẩu của bạn')
            }
        }
    }

    const copyText = () => {
        if (!round) {
            navigator.clipboard.writeText('eve.holt@reqres.in')
            setCopy('Đã sao chép')
            setTimeout(() => {
                setCopy(null)
            }, 1000)
        } else {
            navigator.clipboard.writeText('cityslicka')
            setCopy('Đã sao chép')
            setTimeout(() => {
                setCopy(null)
            }, 1000)
        }
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const onBack = () => {
        setUser('')
        setPassword('')
        setErr('')
        setRound(null)
        setCopy(null)
    }

    const onWarning = () => {
        alert('Tính năng bảo trì')
    }

    // auth
    const login = async () => {
        setLoading(true)
        const params = {
            email: user,
            password: pwd
        }
        try {
            const res = await getRequest.post('login', params)
            setToken(res.data?.token)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const logOut = () => {
        setUser('')
        setErr('')
        setPassword('')
        setRound(null)
        setToken(null)
        setCopy(null)
    }
    //

    return (
        <div className="login flex justify-center lg:mt-52">
            {!token ?
                <form onSubmit={nextRound} className="lg:border border-inherit rounded pt-8 pb-16 lg:px-12">
                    <div className="flex justify-center">
                        <input className="w-20 cursor-default" disabled type="image" src={getImage()} alt="photo" />
                    </div>
                    <div className="mb-0 text-center">
                        <h1 className="text-2xl text-black">{round ? 'Chào mừng' : 'Đăng nhập'}</h1>
                    </div>
                    <div className="mb-6 flex justify-center text-black mt-2">
                        {round ? <div onClick={onBack} className="flex items-center justify-center border cursor-pointer hover:bg-gray-50 min-w-fit rounded-2xl py-1 px-3 text-sm"><img className="h-4 mr-1" alt="User" src={getIconUser()} />{user} <img className="h-4 ml-1" alt="User" src={getArrowImg()} /></div> : <p className="mt-1">Đăng nhập để sử dụng chức năng</p>}
                    </div>

                    <div className="mb-2">
                        <div>
                            {valueMouseS ? <span className="absolute -mt-2.5 ml-3 px-1 text-pri bg-white text-sm">Email hoặc tên đăng nhập</span> : ''}
                        </div>
                        <div>
                            {valueMouseE ? <span className="absolute -mt-2.5 ml-3 px-1 text-pri bg-white text-sm">Nhập mật khẩu</span> : ''}
                        </div>
                        <div>
                            {user && !valueMouseS && !round ? <span className="absolute -mt-2.5 ml-3 px-1 text-gray-500 bg-white text-sm">Email hoặc tên đăng nhập</span> : ''}
                        </div>
                        <div>
                            {pwd && !valueMouseE && round ? <span className="absolute -mt-2.5 ml-3 px-1 text-gray-500 bg-white text-sm">Nhập mật khẩu</span> : ''}
                        </div>
                        {!round ? <input value={user} className="form--input border rounded py-3.5 lg:w-96 w-80 md:w-96" type="text" onChange={(e) => setUser(e.target.value)} onBlur={handleEvent} onFocus={handleEvent} placeholder={!valueMouseS ? 'Email hoặc tên đăng nhập' : ''} /> :
                            <input value={pwd} className="form--input border rounded py-3.5 lg:w-96 w-80 md:w-96" type={passwordShown ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} onBlur={handleEvent} onFocus={handleEvent} placeholder={!valueMouseE ? 'Nhập mật khẩu' : ''} />}
                        <div className="flex items-center mt-1">
                            {err ? <img className="h-3.5 mr-1" alt="User" src={getIconWarning()} /> : ''}
                            <p className="text-xs text-red-500">{err ? err : ''}</p>
                        </div>
                    </div>
                    <div className="mb-6 text-pri">
                        {!round ? <span className="text-sm font-medium cursor-pointer" onClick={onWarning}>Bạn quên mật khẩu?</span> :
                            <div className="flex items-center mt-3">
                                <div className="hover:bg-gray-200 rounded-full">
                                    <input onClick={togglePassword} id="default-checkbox" type="checkbox" value={passwordShown} className="w-4 m-2 h-4 cursor-pointer" />
                                </div>
                                <label htmlFor="default-checkbox" className="cursor-pointer ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Hiện mật khẩu</label>
                            </div>
                        }
                    </div>

                    <div className="mb-6 text-pri">
                        {round ?
                            <div className='flex'>
                                <p className="text-sm text-black mr-2">Password: <span className='text-gray'>cityslicka</span></p>
                                <img className="h-4 cursor-pointer" onClick={copyText} alt="Text" src={getIconCopy()} />
                                <p className='text-sm text-green-500 ml-4'>{copy_sucess}</p>
                            </div> :
                            <div className='flex'>
                                <p className="text-sm text-black mr-2">Email: <span className='text-gray'>eve.holt@reqres.in</span></p>
                                <img className="h-4 cursor-pointer" onClick={copyText} alt="Text" src={getIconCopy()} />
                                <p className='text-sm text-green-500 ml-4'>{copy_sucess}</p>
                            </div>
                        }
                    </div>

                    <div className="flex justify-between items-center">
                        {!round ? <div className="text-pri text-sm font-medium cursor-pointer p-2 rounded hover:bg-blue-50" onClick={onWarning}>Tạo tài khoản</div> :
                            <div className="text-pri text-sm font-medium cursor-pointer p-2 rounded hover:bg-blue-50" onClick={onWarning}>Bạn quên mật khẩu?</div>}
                        <button disabled={loading && round} className={loading && round ? "rounded bg-gray-200 px-5 py-2 text-sm font-bold text-white cursor-pointer flex" : "rounded bg-blue-500 px-5 py-2 text-sm font-bold text-white cursor-pointer flex"}>
                            {loading && round ? <div className='px-2.5'>
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> : 'Tiếp theo'}

                        </button>
                    </div>
                </form>
                :
                <div className='mt-52'>
                    <div className='flex justify-center'><h1 className='text-2xl'>Login success</h1></div>
                    <div className='flex justify-center'><div onClick={logOut} className="text-pri text-sm font-medium cursor-pointer p-2 rounded hover:bg-blue-50">{'< Back'}</div></div>
                </div>

            }

        </div >
    )

}
export default LoginPage