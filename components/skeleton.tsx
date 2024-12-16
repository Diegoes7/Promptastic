import React from 'react'

type SkeletonProps = {
	count?: number
}

const Skeleton = ({ count = 3 }: SkeletonProps) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-auto'>
			{Array(count)
				.fill(null)
				.map((_, index) => (
					<div
						key={index}
						className='border border-[#ff5722] shadow shadow-[#ff5722] rounded-md p-4 w-[250px] h-[250px] mx-auto'
					>
						<div className='animate-pulse flex flex-col space-y-4 h-full'>
							<div className='rounded-full bg-slate-700 h-10 w-10'></div>
							<div className='flex-1 space-y-6 py-1'>
								<div className='h-2 bg-slate-700 rounded'></div>
								<div className='space-y-3'>
									<div className='grid grid-cols-3 gap-4'>
										<div className='h-2 bg-slate-700 rounded col-span-2'></div>
										<div className='h-2 bg-slate-700 rounded col-span-1'></div>
									</div>
									<div className='h-2 bg-slate-700 rounded'></div>
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default Skeleton
