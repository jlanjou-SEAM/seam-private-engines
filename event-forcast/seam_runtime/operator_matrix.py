
from __future__ import annotations
from dataclasses import dataclass
from typing import Any, Callable, Dict, Tuple
import hashlib, math
import numpy as np

UNRESOLVED = None

NAMES = [
"identity","classification","membership","cardinality","composition",
"property_attribute","scalar_quantity","vector_tensor","ratio_proportion","spatial_position",
"distance_length","angle_orientation","area_surface","volume_extent","topology_connectivity",
"symmetry_invariance","state_configuration","state_transition","temporal_order","rate_derivative",
"trajectory_path","oscillation_frequency","wave_propagation","transport_flux","interaction_response",
"conservation_balance","equilibrium_stability","field_potential","energy_work_power","thermodynamic_state",
"material_constitutive","reaction_stoichiometry","kinetics_growth_decay","biological_genetic","algebraic_relation",
"differential_relation","integral_accumulation","inequality_constraint","optimization_extremum","scaling_similarity",
"dimensionless_similarity","transformation_mapping","graph_network","probability_distribution","statistical_estimation",
"information_entropy","logic_theorem","inference_explanation","causal_dependency","control_feedback",
"numerical_algorithm","semantic_language","historical_genealogical","normative_institutional","evidence_validation",
"model_projection","provenance_authority","continuum_regime","validity_domain","breakdown_replacement",
"boundary_initial","closure_requirement","native_seam","learning_adaptation","state","closure"
]

@dataclass(frozen=True)
class OperatorSpec:
    operator_id: int
    nomenclature: str
    signature: str
    requires: Tuple[str, ...]
    result_type: str
    indices_consumed: str
    execute: Callable[[Dict[str, Any]], Any]

def compute_base_vector(M):
    M=np.asarray(M,dtype=float)
    if M.shape!=(51,5):
        raise ValueError("M must be 51x5")
    return M.flatten()

def compute_arc_outputs(v):
    v=np.asarray(v,dtype=float).reshape(-1)
    if v.size != 255:
        raise ValueError("v must have 255 elements")
    A=np.zeros(64,dtype=float)
    for k in range(1,65):
        l=int(np.floor(255*(k-1)/64))+1
        r=int(np.floor(255*k/64))
        n=np.arange(l,r+1)
        A[k-1]=np.sum(v[n-1]*((-1.0)**(n%2))*(n/255.0))
    return A

def softmax(v):
    x=np.asarray(v,float)
    z=x-np.max(x)
    e=np.exp(z)
    return e/np.sum(e)

def entropy(p):
    p=np.asarray(p,float)
    if np.any(p<0) or not np.isclose(np.sum(p),1.0,atol=1e-9):
        return UNRESOLVED
    q=p[p>0]
    return float(-np.sum(q*np.log2(q)))

def registry():
    S=[]
    add=S.append
    add(OperatorSpec(1,NAMES[0],"v",("v",),"primitive_scalar","v[0]",lambda c: float(c["v"][0])))
    add(OperatorSpec(2,NAMES[1],"v",("v","classification_bins"),"categorical_integer","v[0:5]",
        lambda c: int(np.ravel_multi_index(tuple(np.digitize(c["v"][:5],c["classification_bins"])), tuple([len(c["classification_bins"])+1]*5)))))
    add(OperatorSpec(3,NAMES[2],"v",("v",),"binary","v[5:10]",lambda c:int(np.any(c["v"][5:10]!=0))))
    add(OperatorSpec(4,NAMES[3],"v",("v",),"integer","v[10:15]",lambda c:int(np.count_nonzero(c["v"][10:15]))))
    add(OperatorSpec(5,NAMES[4],"v",("v",),"scalar","v[15:20]",lambda c:float(np.sum(c["v"][15:20]))))
    add(OperatorSpec(6,NAMES[5],"v",("v","attribute_index"),"vector[51]","v[j::5]",lambda c:c["v"][int(c["attribute_index"])-1::5].copy()))
    add(OperatorSpec(7,NAMES[6],"v",("v","scalar_index"),"scalar","v[n]",lambda c:float(c["v"][int(c["scalar_index"])-1])))
    add(OperatorSpec(8,NAMES[7],"v",("M","primitive_index"),"vector[5]","M[i,:]",lambda c:c["M"][int(c["primitive_index"])-1].copy()))
    add(OperatorSpec(9,NAMES[8],"v",("v","ratio_pair"),"scalar","v[i],v[j]",lambda c: UNRESOLVED if c["v"][c["ratio_pair"][1]-1]==0 else float(c["v"][c["ratio_pair"][0]-1]/c["v"][c["ratio_pair"][1]-1])))
    add(OperatorSpec(10,NAMES[9],"v",("M",),"vector[3]","M[0:3,:]",lambda c:c["M"][:3].mean(axis=1)))
    add(OperatorSpec(11,NAMES[10],"mixed",("spatial_points",),"scalar","two xyz triplets",lambda c:float(np.linalg.norm(np.asarray(c["spatial_points"][0])-np.asarray(c["spatial_points"][1])))))
    def angle(c):
        a,b=map(lambda x:np.asarray(x,float),c["orientation_vectors"])
        d=np.linalg.norm(a)*np.linalg.norm(b)
        return UNRESOLVED if d==0 else float(np.arccos(np.clip(np.dot(a,b)/d,-1,1)))
    add(OperatorSpec(12,NAMES[11],"mixed",("orientation_vectors",),"radians","two vectors",angle))
    add(OperatorSpec(13,NAMES[12],"v",("M",),"scalar","M[0:3,0:3]",lambda c:float(abs(np.linalg.det(c["M"][:3,:3])))))
    add(OperatorSpec(14,NAMES[13],"v",("M",),"scalar","M[0:4,0:4]",lambda c:float(abs(np.linalg.det(c["M"][:4,:4])))))
    add(OperatorSpec(15,NAMES[14],"mixed",("adjacency",),"boolean_matrix","adjacency",lambda c:(np.asarray(c["adjacency"])!=0).astype(int)))
    add(OperatorSpec(16,NAMES[15],"v",("v","reflection_index"),"scalar","v[n],v[254-n]",lambda c:float(abs(c["v"][c["reflection_index"]-1]-c["v"][255-c["reflection_index"]]))))
    add(OperatorSpec(17,NAMES[16],"v",("v",),"vector[255]","all v",lambda c:c["v"]/(np.linalg.norm(c["v"])+1e-15)))
    add(OperatorSpec(18,NAMES[17],"v_pair",("v","v_prev"),"vector[255]","v_t,v_prev",lambda c:c["v"]-c["v_prev"]))
    add(OperatorSpec(19,NAMES[18],"v",("v",),"ordered_tuple","all v",lambda c:np.sort(c["v"])))
    add(OperatorSpec(20,NAMES[19],"v",("v",),"vector[254]","adjacent v",lambda c:np.diff(c["v"])))
    add(OperatorSpec(21,NAMES[20],"v",("v",),"vector[255]","all v",lambda c:np.cumsum(c["v"])))
    add(OperatorSpec(22,NAMES[21],"v",("v",),"frequency_spectrum","all v",lambda c:np.fft.rfft(c["v"])))
    add(OperatorSpec(23,NAMES[22],"v",("v",),"vector[255]","all v",lambda c:np.convolve(c["v"],[.25,.5,.25],mode="same")))
    add(OperatorSpec(24,NAMES[23],"A",("A",),"scalar","A[23]",lambda c:float(c["A"][23])))
    add(OperatorSpec(25,NAMES[24],"v",("v",),"matrix","v[0:10]",lambda c:np.outer(c["v"][:10],c["v"][:10])))
    add(OperatorSpec(26,NAMES[25],"v",("v",),"scalar","all v",lambda c:float(np.sum(c["v"]))))
    add(OperatorSpec(27,NAMES[26],"A",("A",),"variance","all A",lambda c:float(np.var(c["A"]))))
    add(OperatorSpec(28,NAMES[27],"v",("v",),"vector[255]","all v",lambda c:-np.gradient(c["v"])))
    add(OperatorSpec(29,NAMES[28],"v",("v",),"scalar","all v",lambda c:float(.5*np.dot(c["v"],c["v"]))))
    add(OperatorSpec(30,NAMES[29],"v",("v",),"probability_vector[64]","v[0:64]",lambda c:softmax(-c["v"][:64])))
    add(OperatorSpec(31,NAMES[30],"mixed",("M","constitutive_matrix"),"tensor","M,C",lambda c:c["M"]@np.asarray(c["constitutive_matrix"],float)))
    add(OperatorSpec(32,NAMES[31],"mixed",("stoich_matrix","stoich_state"),"residual_vector","S,x",lambda c:np.asarray(c["stoich_matrix"],float)@np.asarray(c["stoich_state"],float)))
    add(OperatorSpec(33,NAMES[32],"v",("v","decay_alpha"),"vector[255]","all v",lambda c:c["v"]*np.exp(-float(c["decay_alpha"])*np.arange(1,256))))
    add(OperatorSpec(34,NAMES[33],"mixed",("sequence_a","sequence_b"),"integer_distance","two sequences",lambda c:int(np.count_nonzero(np.asarray(c["sequence_a"])!=np.asarray(c["sequence_b"]))) if np.asarray(c["sequence_a"]).shape==np.asarray(c["sequence_b"]).shape else UNRESOLVED))
    add(OperatorSpec(35,NAMES[34],"v",("v","poly_coeffs","scalar_index"),"scalar","v[n]",lambda c:float(np.polyval(c["poly_coeffs"],c["v"][c["scalar_index"]-1]))))
    add(OperatorSpec(36,NAMES[35],"v",("v","stencil_index"),"scalar","v[n-1:n+2]",lambda c:float(c["v"][c["stencil_index"]]-2*c["v"][c["stencil_index"]-1]+c["v"][c["stencil_index"]-2])))
    add(OperatorSpec(37,NAMES[36],"v",("v","integral_bounds"),"scalar","v[l:r]",lambda c:float(np.sum(c["v"][c["integral_bounds"][0]-1:c["integral_bounds"][1]]))))
    add(OperatorSpec(38,NAMES[37],"v",("v","constraint_threshold"),"boolean_vector","all v",lambda c:c["v"]<=c["constraint_threshold"]))
    add(OperatorSpec(39,NAMES[38],"A",("A",),"integer_index","all A",lambda c:int(np.argmax(c["A"]))+1))
    add(OperatorSpec(40,NAMES[39],"v",("v","scale_factor"),"vector[255]","all v",lambda c:c["v"]*c["scale_factor"]))
    add(OperatorSpec(41,NAMES[40],"v",("v","dimensionless_pair"),"scalar","v[i],v[j]",lambda c:UNRESOLVED if c["v"][c["dimensionless_pair"][1]-1]==0 else float(c["v"][c["dimensionless_pair"][0]-1]/c["v"][c["dimensionless_pair"][1]-1])))
    add(OperatorSpec(42,NAMES[41],"A",("A",),"vector[64]","all A",lambda c:c["A"].copy()))
    def lap(c):
        W=np.asarray(c["adjacency"],float); return np.diag(W.sum(axis=1))-W if W.ndim==2 and W.shape[0]==W.shape[1] else UNRESOLVED
    add(OperatorSpec(43,NAMES[42],"mixed",("adjacency",),"laplacian","adjacency",lap))
    add(OperatorSpec(44,NAMES[43],"v",("v",),"probability_vector","all v",lambda c:softmax(c["v"])))
    add(OperatorSpec(45,NAMES[44],"v",("v",),"tuple(mu,var)","all v",lambda c:(float(np.mean(c["v"])),float(np.var(c["v"])))))
    add(OperatorSpec(46,NAMES[45],"mixed",("probability",),"entropy","probability",lambda c:entropy(c["probability"])))
    add(OperatorSpec(47,NAMES[46],"v",("v",),"boolean","v[0:10]",lambda c:bool(np.all(c["v"][:10]>0))))
    add(OperatorSpec(48,NAMES[47],"A",("A","rule_weights"),"scalar","A[0:n]",lambda c:float(np.dot(c["A"][:len(c["rule_weights"])],c["rule_weights"]))))
    def granger(c):
        H=np.asarray(c["history"],float)
        if H.ndim!=2 or H.shape[0]<4 or H.shape[1]<2:return UNRESOLVED
        x,y=H[:,0],H[:,1]; yy=y[1:]
        X0=np.c_[np.ones(len(yy)),y[:-1]]; X1=np.c_[np.ones(len(yy)),y[:-1],x[:-1]]
        b0=np.linalg.lstsq(X0,yy,rcond=None)[0]; b1=np.linalg.lstsq(X1,yy,rcond=None)[0]
        rss0=np.sum((yy-X0@b0)**2); rss1=np.sum((yy-X1@b1)**2)
        return float(max(0,rss0-rss1))
    add(OperatorSpec(49,NAMES[48],"history",("history",),"dependency_scalar","history",granger))
    add(OperatorSpec(50,NAMES[49],"history",("error_history","pid_gains"),"scalar","error history",lambda c:float(c["pid_gains"][0]*c["error_history"][-1]+c["pid_gains"][1]*np.sum(c["error_history"])+c["pid_gains"][2]*(c["error_history"][-1]-c["error_history"][-2])) if len(c["error_history"])>=2 else UNRESOLVED))
    add(OperatorSpec(51,NAMES[50],"A",("A",),"scalar_residual","all A",lambda c:float(np.linalg.norm(np.diff(c["A"])))))
    add(OperatorSpec(52,NAMES[51],"mixed",("semantic_matrix","semantic_input"),"vector","numeric encoded semantic state",lambda c:np.asarray(c["semantic_matrix"])@np.asarray(c["semantic_input"])))
    add(OperatorSpec(53,NAMES[52],"history",("lineage_graph",),"graph_structure","lineage graph",lambda c:c["lineage_graph"]))
    add(OperatorSpec(54,NAMES[53],"mixed",("constraints",),"boolean","constraint set",lambda c:bool(all(fn(c) for fn in c["constraints"]))))
    add(OperatorSpec(55,NAMES[54],"mixed",("validation_predicted","validation_actual","validation_threshold"),"validation_record","validation arrays",lambda c:{"residual":float(np.linalg.norm(np.asarray(c["validation_predicted"])-np.asarray(c["validation_actual"]))),"pass":bool(np.linalg.norm(np.asarray(c["validation_predicted"])-np.asarray(c["validation_actual"]))<=c["validation_threshold"])}))
    add(OperatorSpec(56,NAMES[55],"mixed",("projection_matrix","v"),"vector","W,v",lambda c:np.asarray(c["projection_matrix"])@c["v"]))
    add(OperatorSpec(57,NAMES[56],"mixed",("v","expected_hash"),"digest_record","all v",lambda c:(lambda d:{"sha256":d,"matches":d==str(c["expected_hash"]).lower()})(hashlib.sha256(np.asarray(c["v"],dtype=np.float64).tobytes()).hexdigest())))
    add(OperatorSpec(58,NAMES[57],"mixed",("regime_scalar","regime_bounds"),"integer","aggregate scalar",lambda c:int(np.digitize([c["regime_scalar"]],c["regime_bounds"])[0])))
    add(OperatorSpec(59,NAMES[58],"v",("v","valid_range"),"boolean","all v",lambda c:bool(np.all((c["v"]>=c["valid_range"][0])&(c["v"]<=c["valid_range"][1])))))
    add(OperatorSpec(60,NAMES[59],"v",("v","breakdown_threshold"),"boolean","all v",lambda c:bool(np.any(np.abs(c["v"])>c["breakdown_threshold"]))))
    add(OperatorSpec(61,NAMES[60],"v",("v",),"pair","v[0],v[-1]",lambda c:(float(c["v"][0]),float(c["v"][-1]))))
    add(OperatorSpec(62,NAMES[61],"A",("A","closure_epsilon"),"boolean","A[-2:]",lambda c:bool(abs(c["A"][-1]-c["A"][-2])<c["closure_epsilon"])))
    add(OperatorSpec(63,NAMES[62],"A",("A",),"vector[63]","adjacent A",lambda c:np.diff(c["A"])))
    add(OperatorSpec(64,NAMES[63],"mixed",("weights","gradient","learning_rate"),"vector","w,grad",lambda c:np.asarray(c["weights"])-c["learning_rate"]*np.asarray(c["gradient"])))
    add(OperatorSpec(65,NAMES[64],"mixed",("v","A"),"vector[66]","all v,A",lambda c:np.concatenate([c["A"],[np.sum(c["v"]),np.var(c["A"])]])))
    add(OperatorSpec(66,NAMES[65],"mixed",("A","terminal_epsilon","terminal_constraints_satisfied"),"boolean","all A",lambda c:bool(np.var(c["A"])<=c["terminal_epsilon"] and c["terminal_constraints_satisfied"])))
    return tuple(S)

REGISTRY=registry()

def build_context(M,**extra):
    M=np.asarray(M,float); v=compute_base_vector(M); A=compute_arc_outputs(v)
    ctx={"M":M,"v":v,"A":A}
    ctx.update(extra)
    if "probability" not in ctx:ctx["probability"]=softmax(v)
    return ctx

def evaluate_all(M,**extra):
    ctx=build_context(M,**extra)
    rows=[]
    for s in REGISTRY:
        missing=[x for x in s.requires if x not in ctx]
        if missing:
            rows.append({"operator_id":s.operator_id,"nomenclature":s.nomenclature,"signature":s.signature,
                         "requirements_satisfied":False,"missing_requirements":missing,"result":UNRESOLVED,
                         "result_type":s.result_type,"indices_consumed":s.indices_consumed})
            continue
        try:
            result=s.execute(ctx)
            ok=result is not UNRESOLVED
            rows.append({"operator_id":s.operator_id,"nomenclature":s.nomenclature,"signature":s.signature,
                         "requirements_satisfied":ok,"missing_requirements":[] if ok else ["mathematical_precondition"],
                         "result":result,"result_type":s.result_type,"indices_consumed":s.indices_consumed})
        except Exception as e:
            rows.append({"operator_id":s.operator_id,"nomenclature":s.nomenclature,"signature":s.signature,
                         "requirements_satisfied":False,"missing_requirements":[f"execution_precondition:{type(e).__name__}"],
                         "result":UNRESOLVED,"result_type":s.result_type,"indices_consumed":s.indices_consumed})
    return rows

def summarize(rows):
    return {"total":len(rows),"resolved":sum(r["requirements_satisfied"] for r in rows),
            "unresolved":sum(not r["requirements_satisfied"] for r in rows)}
