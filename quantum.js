(function(root){
  'use strict';
  const EPS=1e-10, S=Math.SQRT1_2;
  const states={ 'Z+':[1,0], 'Z-':[0,1], 'X+':[S,S], 'X-':[S,-S] };
  function gate(v,g){const [a,b]=v;if(g==='H')return [(a+b)*S,(a-b)*S];if(g==='X')return [b,a];if(g==='Z')return [a,-b];throw Error('Unknown gate');}
  function probability(v,basis,outcome=0){const e=states[basis+(outcome===0?'+':'-')];if(!e)throw Error('Unknown basis');return Math.min(1,Math.max(0,(v[0]*e[0]+v[1]*e[1])**2));}
  function measure(v,basis,rng=Math.random){const p=probability(v,basis);const outcome=rng()<p?0:1;return {state:states[basis+(outcome===0?'+':'-')].slice(),outcome,probability:outcome===0?p:1-p};}
  function ensembleGate(branches,g){return branches.map(b=>({weight:b.weight,state:gate(b.state,g)}));}
  function ensembleMeasure(branches,basis){const weights=[0,0];for(const b of branches){const p=probability(b.state,basis);weights[0]+=b.weight*p;weights[1]+=b.weight*(1-p);}return weights.flatMap((weight,i)=>weight>EPS?[{weight,state:states[basis+(i===0?'+':'-')].slice()}]:[]);}
  function fidelity(branches,target){return branches.reduce((sum,b)=>sum+b.weight*(b.state[0]*target[0]+b.state[1]*target[1])**2,0);}
  function certain(branches,basis){return branches.every(b=>{const p=probability(b.state,basis);return p<EPS||p>1-EPS;});}
  const api={states,gate,probability,measure,ensembleGate,ensembleMeasure,fidelity,certain};
  if(typeof module!=='undefined')module.exports=api;else root.Quantum=api;
})(typeof window!=='undefined'?window:globalThis);
