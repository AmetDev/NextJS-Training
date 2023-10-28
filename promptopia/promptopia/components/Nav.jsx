'use client'
import { getProviders, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const Nav = () => {
	const isUserLoggedIn = true
	const [providers, setProviders] = useState(null)
	const [toggleDropDown, setToggleDropDown] = useState(false)
	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders()
			setProviders(response)
		}
		setProviders()
	}, [])
	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					width={30}
					height={30}
					alt='Promptopia Logo'
					className='object-contain'
				/>
				<p className='logo_text'>Propmtopia</p>
				{/*Mobile navigation*/}
				<div className='sm:flex hidden'>
					{isUserLoggedIn ? (
						<div className='flex gap-3 md:gap-5'>
							<Link className='black_btn' href='/create-prompt'>
								Create prompt
							</Link>
							<button type='button' onClick={signOut} className='outline_btn'>
								Sign Out
							</button>
							<Link href='/profile'>
								<Image src='/assets/images/logo.svg' width={37} height={37} />
							</Link>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map(provider => (
									<button
										type='button'
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className='black_btn'
									>
										Sign In
									</button>
								))}
						</>
					)}
				</div>
			</Link>
			{/*mobile navigation*/}
			{isUserLoggedIn ? (
				<div className='flex'>
					<Image
						src='/assets/images/logo.svg'
						width={37}
						height={37}
						className='rounded-full'
						alt='profile'
						onClick={() => setToggleDropdown(!toggleDropdown)}
					/>

					{toggleDropDown && (
						<div className='dropdown'>
							<Link
								href='/profile'
								className='dropdown_link'
								onClick={() => setToggleDropdown(false)}
							>
								My Profile
							</Link>
							<Link
								href='/create-prompt'
								className='dropdown_link'
								onClick={() => setToggleDropdown(false)}
							>
								Create Prompt
							</Link>
							<button
								type='button'
								onClick={() => {
									setToggleDropdown(false)
									signOut()
								}}
								className='mt-5 w-full black_btn'
							>
								Sign Out
							</button>
						</div>
					)}
				</div>
			) : (
				<>
					{providers &&
						Object.values(providers).map(provider => (
							<button
								type='button'
								key={provider.name}
								onClick={() => signIn(provider.id)}
								className='black_btn'
							>
								Sign In
							</button>
						))}
				</>
			)}
		</nav>
	)
}

export default Nav
