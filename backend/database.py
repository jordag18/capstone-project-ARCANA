from model import Project
import motor.motor_asyncio


client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.ARCANA
collection= database.projects

async def fetch_one_project(project_name):
		document = await collection.find_one({"project_name":project_name})
		return document

async def fetch_all_projects():
		projects = []
		cursor = collection.find({})
		async for document in cursor:
				projects.append(Project(**document))
		return projects


async def create_project(project):
		document = project
		result = await collection.insert_one(document)
		return result


async def update_project(project_name, project_location, start_date, end_date, initials):
		await collection.update_one({"project_name":project_name},{"$set":{
			"project_location": project_location,
			"start_date": start_date,
			"end_date": end_date,
			"initials": initials
		}})
		document = await collection.find_one({"project_name":project_name})
		return document

async def remove_project(project_name):
		await collection.delete_one({"project_name":project_name})
		return True

