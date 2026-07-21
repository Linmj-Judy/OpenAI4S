import os
from pathlib import Path

from pymol import cmd

ROOT = Path(
    os.environ.get(
        "OPENAI4S_PROTEIN_DESIGN_DIR",
        Path(os.environ.get("PWD", ".")).resolve() / "cases/protein_design",
    )
)
SCAFFOLDS = ["1GY6", "4FCJ", "3MG1", "2QIY", "2A15"]


def setup_scene():
    cmd.reinitialize()
    cmd.bg_color("white")
    cmd.set("ray_opaque_background", 1)
    cmd.set("orthoscopic", 1)
    cmd.set("antialias", 2)
    cmd.set("ambient", 0.48)
    cmd.set("direct", 0.62)
    cmd.set("specular", 0.18)
    cmd.set("ray_trace_mode", 0)
    cmd.set("ray_trace_gain", 0.01)
    cmd.set("depth_cue", 0)


def render_clean(pdb_id):
    setup_scene()
    obj = "s"
    cmd.load(str(ROOT / f"{pdb_id}_clean.pdb"), obj)
    cmd.hide("everything", "all")
    cmd.show("cartoon", "all")
    cmd.color("slate", "all")
    cmd.set("cartoon_fancy_helices", 1)
    cmd.set("cartoon_smooth_loops", 1)
    cmd.orient("all")
    cmd.zoom("all", 4)
    cmd.turn("x", 10)
    cmd.turn("y", -18)
    cmd.ray(900, 760)
    cmd.png(str(ROOT / f"{pdb_id}_clean.png"), width=900, height=760, dpi=200, ray=0)


def render_complex(pdb_id):
    setup_scene()
    obj = "m"
    cmd.load(str(ROOT / f"{pdb_id}_complex.pdb"), obj)
    ligand = "resn UNL or chain L"
    pocket = f"(not ({ligand})) within 7 of ({ligand})"
    protein = f"not ({ligand})"
    cmd.hide("everything", "all")
    cmd.show("cartoon", protein)
    cmd.color("gray70", protein)
    cmd.set("cartoon_transparency", 0.12, protein)
    cmd.show("sticks", pocket)
    cmd.color("palecyan", pocket)
    cmd.set("stick_radius", 0.08, pocket)
    cmd.show("sticks", ligand)
    cmd.set("stick_radius", 0.22, ligand)
    cmd.color("gray25", f"{ligand} and elem C")
    cmd.color("marine", f"{ligand} and elem N")
    cmd.color("firebrick", f"{ligand} and elem O")
    cmd.color("white", f"{ligand} and elem H")
    cmd.show("spheres", f"{ligand} and elem H")
    cmd.set("sphere_scale", 0.16, f"{ligand} and elem H")
    cmd.orient(f"{ligand} or {pocket}")
    cmd.zoom(f"{ligand} or {pocket}", 5)
    cmd.turn("x", 8)
    cmd.turn("y", -24)
    cmd.ray(1200, 820)
    cmd.png(str(ROOT / f"{pdb_id}_complex.png"), width=1200, height=820, dpi=200, ray=0)


for scaffold in SCAFFOLDS:
    render_clean(scaffold)
    render_complex(scaffold)

cmd.quit()
