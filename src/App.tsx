import './App.css'
import {createPromiseClient} from "@connectrpc/connect";
import { TendermintProxyService } from '@buf/penumbra-zone_penumbra.connectrpc_es/penumbra/util/tendermint_proxy/v1alpha1/tendermint_proxy_connect';
import {createGrpcWebTransport} from "@connectrpc/connect-web";
import {useQuery} from '@tanstack/react-query';

const transport = createGrpcWebTransport({
    baseUrl: 'https://grpc.testnet.penumbra.zone',
});

export const grpcClient = createPromiseClient(TendermintProxyService, transport);

function App() {

  const {data, isLoading, error} = useQuery({
        queryKey: ['app-params'],
        queryFn: async () => grpcClient.getStatus({}),
       retry: false
    });

  return (
    <>
        {data && <div>
            <div>Data ✅</div>
            <div>{JSON.stringify(data, null, 2)}</div>
        </div>}
        {isLoading && <div>Is loading... ⚠️</div>}
        {error && <div>
            <div>
                Error ❌
            </div>
            <div>
                {String(error)}
            </div>
        </div>}
    </>
  )
}

export default App
