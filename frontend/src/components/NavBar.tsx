import { getCookie } from "@/app/actions";
import { Admin } from "@/models/enum";
import { UserModel } from "@/models/userModel";
import { buildUser } from "@/utils";
import { UserCookieKey } from "@/utils/constants";
import { HTMLProps, PropsWithChildren } from "react";

interface NavBarProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {}

export async function NavBar({...rest}: NavBarProps) {
	let hasImage: boolean;
	// let _user = await getCookie(UserCookieKey);
	// let user: UserModel;
	const user: UserModel = await buildUser();
	hasImage = Boolean(user.profileImagePath.length);

	// if (_user) {
	// 	user = JSON.parse(_user.value) as UserModel;
	// 	hasImage = Boolean(user.profileImagePath.length);
	// } else {
	// 	hasImage = false;
	// }

	return (
		<>
			<div {...rest} className={"navbar" + ` ${rest.className}`}>
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">
						<div className="w-60 rounded-full bg-white p-2">
							<img alt="" src="/image/crmvgo-logo-top.png" />
						</div>
					</a>
				</div>
				<div className="flex gap-3">
					<div className="flex-col">
						<p className='font-bold'>{user!.name.split(' ')[0]}</p>
						{user!.roles.includes(Admin) && (
							<p className='text-[10px]'>Admin</p>
						)}
					</div>
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="avatar">
								{/* <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-0"> */}
								<div className="w-13 rounded-full">
									{hasImage && (
										<img
											alt=""
											src={user!.profileImagePath}
										/>
									)}
									{!hasImage && (
										<img
											alt=""
											src="/image/empty-profile-image.png"
										/>
									)}
								</div>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a>
									Profile
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
