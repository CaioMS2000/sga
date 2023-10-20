import { OrderModel } from "@/models/orderModel";
import { PropsWithChildren } from "react";

interface OrderHorizontalCardProps extends PropsWithChildren {
	order: OrderModel;
}

export default async function OrderHorizontalCard({
	order: { code, item, analysis, requester, createdAt },
}: OrderHorizontalCardProps) {
  const Status = analysis?(analysis.isApproved?<span className='text-green-600'>Aprovado</span>:<span className='text-red-600'>Rejeitado</span>):(<span className='text-orange-500'>Pendente</span>)
  const data = new Date(createdAt);
  const day = data.getDate();
  const month = data.getMonth() + 1; // Os meses são indexados de 0 a 11
  const year = data.getFullYear();

	return (
		<>
			<a href={`/dashboard/order/${code}`}>
        <div className="container flex flex-row bg-teal-800 p-4 rounded-lg items-center">
          <div className="border-neutral-400 border-2 p-3 h-fit rounded-lg">
                  <img
                    src={item.imagePath}
                    alt={`Item do pedido ${code}`}
                    className="max-h-40 rounded-lg"
                  />
                </div>
          <div className="divider divider-horizontal" />
          {/* <div className="flex flex-col"></div> */}
          <div className="join join-vertical gap-3">
            <div className="flex gap-3 border-neutral-400 border-2 p-3">
              <span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
                Código
              </span>
              <p>{code}</p>
            </div>
            <div className="flex gap-3 border-neutral-400 border-2 p-3">
              <span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
                Status
              </span>
              {Status}
            </div>
            <div className="flex gap-3 border-neutral-400 border-2 p-3">
              <span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
                Pedido por
              </span>
              <p className='font-bold'>{requester.name}</p>
            </div>
            <div className="flex gap-3 border-neutral-400 border-2 p-3">
              <span className="badge bg-neutral-400 border-neutral-400 bg-opacity-40 p-3">
                Data do pedido
              </span>
              <p className='font-bold'>{day}/{month}/{year}</p>
            </div>
          </div>
        </div>
      </a>
		</>
	);
}
