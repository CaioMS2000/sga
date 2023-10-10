import { PropsWithChildren } from "react";
import { BsFillPersonFill } from "react-icons/bs";

interface NavBarProps extends PropsWithChildren {}

export function NavBar({}: NavBarProps) {
	const hasImage = false;

	return (
		<>
			<div className="navbar bg-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">daisyUI</a>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="avatar">
								<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
									{hasImage && <BsFillPersonFill />}
									{!hasImage && <img alt="" src="" />}
								</div>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a className="justify-between">
									Profile
									<span className="badge">New</span>
								</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
