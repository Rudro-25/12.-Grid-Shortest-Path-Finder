//Minimum spanning tree cost + edge find using kruskal + DSU
//complexity: mlogn
 
#include <bits/stdc++.h>
using namespace std;
 
#define ll long long int
#define pb push_back
#define MP make_pair
#define all(x) x.begin(),x.end()
#define Max 10000000000000000
 
vector<pair<ll,pair<ll,ll>>> g;
ll par[1000007];
vector<pair<ll,ll>> ans;
map<pair<ll,ll>,ll> mp;
ll mst_cost;
 
ll find_par(ll x)
{
	if(par[x]==x) return x;
	return par[x]=find_par(par[x]);
}
 
void ds_union(ll u,ll v)
{
	ll par_u=find_par(u);
	ll par_v=find_par(v);
	if(par_u!=par_v){
		par[par_v]=par_u;
		ans.pb({u,v});
	}
}
 
void mst(ll n)
{
	ll i=0;
	while(ans.size()!=n-1){
		ds_union(g[i].second.first,g[i].second.second);
		i++;
	}
}
 
int main()
{
 
	ll n,m;
	cin>>n>>m;
 
	for(ll i=1;i<=m;i++){
		ll u,v,c;
		cin>>u>>v>>c;
		g.pb({c,{u,v}});
		mp[MP(u,v)]=c;
	}
 
	for(ll i=1;i<=n;i++) par[i]=i;
 
	sort(all(g));
	mst(n);
 
	cout<<endl<<"Edges of the mst:"<<endl;
	for(ll i=0;i<ans.size();i++){
        cout<<ans[i].first<<" "<<ans[i].second<<endl;
        ll f=ans[i].first,l=ans[i].second;
        mst_cost+=mp[MP(f,l)];
	}
 
    cout<<endl<<"Minimum spanning tree cost:"<<endl;
	cout<<mst_cost<<endl;
 
	return 0;
}
 
/*
4 5
1 2 2
1 3 4
2 3 1
3 4 4
2 4 5
 
ans:
Edges of the mst:
2 3
1 2
3 4
 
Minimum spanning tree cost:
7
 
*/